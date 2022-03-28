const tensorflow = require("@tensorflow/tfjs-node");
const { loadData } = require("./prediction.js");
const math = require('mathjs');
const { expandDims } = require("@tensorflow/tfjs-node");
const parameters = require("./parameters.js");
const minimist = require('minimist');

function getPredictionData(dataFrame, futurePrice) {
    let trueData = {
        x: dataFrame[`trueAdjustClose${parameters.lookUpStep}`].index,
        y: dataFrame[`trueAdjustClose${parameters.lookUpStep}`].values
    }
    let data = {
        x: dataFrame[`adjustClose${parameters.lookUpStep}`].index,
        y: dataFrame[`adjustClose${parameters.lookUpStep}`].values
    }
    return {
        trueData,
        data,
        futurePrice,
        days: parameters.lookUpStep
    }
}

async function test(symbol) {
    if (!symbol) {
        let symbolArg = minimist(process.argv.slice(2))["symbol"];
        if (!symbolArg) {
            throw new Error('symbol is required to train the model. Example: npm run train -- --symbol=MVZ.A');
        }
        symbol = symbolArg;
    }
    symbol = symbol.toUpperCase();
    console.log('Symbol', symbol);
    let path = `${parameters.modelPath}/model-${symbol.replace('.', '_')}`;
    let data = await loadData(symbol, parameters.scale, parameters.lookUpStep, parameters.stepsCount,
        parameters.splitByDate, parameters.shuffle, parameters.testSize);
    let model = await tensorflow.loadLayersModel(`${path}/model.json`);
    model.compile({
        loss: "meanSquaredError",
        metrics: ["accuracy"],
        optimizer: "rmsprop"
    });
    let [loss, mae] = model.evaluate(data.x_test, data.y_test, { verbose: 0 });
    let meanAbsoluteError;
    if (parameters.scale) {
        meanAbsoluteError = data.columnScaler.close.inverseTransform(mae).arraySync()[0];
    } else {
        meanAbsoluteError = mae.arraySync()[0];
    }

    let finalDataFrame = getFinalDataFrame(data, model);
    let futurePrice = predict(data, model);
    console.log(`Future price after ${parameters.lookUpStep} days is ${futurePrice}`);
    console.log(`Loss: ${loss}`);
    console.log(`Mean Absolute Error: ${meanAbsoluteError}`);
    // plotGraph(finalDataFrame);
    return getPredictionData(finalDataFrame, futurePrice);
}

function predict(data, model) {
    let lastSequence = data.lastSequence.map((value) => value.map((number) => parseFloat(number)));
    lastSequence = lastSequence.slice(data.lastSequence.length - parameters.stepsCount, data.lastSequence.length);
    lastSequence = tensorflow.expandDims(lastSequence, 0)
    let prediction = model.predict(lastSequence);
    let predictedPrice;
    if (parameters.scale) {
        predictedPrice = data.columnScaler.close.inverseTransform(prediction).arraySync()[0][0];
    } else {
        predictedPrice = prediction.arraySync()[0][0]
    }
    return predictedPrice
}

function getFinalDataFrame(data, model) {
    let xTest = data.x_test;
    let yTest = data.y_test;
    let yPrediction = model.predict(xTest);
    if (parameters.scale) {
        yTest = math.squeeze(data.columnScaler.close.inverseTransform(expandDims(yTest, 0)).arraySync());
        yPrediction = math.squeeze(data.columnScaler.close.inverseTransform(yPrediction).arraySync());
    }
    let testDataFrame = data.test_dataframe;
    console.log(testDataFrame["close"].values.length);
    testDataFrame.addColumn(`adjustClose${parameters.lookUpStep}`, yTest, { inplace: true });
    testDataFrame.addColumn(`trueAdjustClose${parameters.lookUpStep}`, yPrediction, { inplace: true });
    testDataFrame.sortIndex({ inplace: true });
    return testDataFrame;
}

module.exports = {
    test
}