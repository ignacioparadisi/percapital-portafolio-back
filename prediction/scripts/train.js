const { loadData, createModel }  = require("./prediction.js");
const tensorflow = require('@tensorflow/tfjs-node');
const minimist = require('minimist');
const parameters = require('./parameters.js');

async function train() {
    let symbol = minimist(process.argv.slice(2))["symbol"];
    if (!symbol) {
        throw new Error('symbol is required to train the model. Example: npm run train -- --symbol=MVZ.A');
    }
    symbol = symbol.toUpperCase();
    console.log('Symbol', symbol);
    let data = await loadData(symbol, parameters.scale, parameters.lookUpStep, parameters.stepsCount,
        parameters.splitByDate, parameters.shuffle, parameters.testSize);
    let model = createModel(parameters.sequenceLength, parameters.featuresCount, parameters.units,
        parameters.layers, parameters.bidirectional, parameters.dropout, parameters.loss, parameters.optimizer);
    let x = data["x_train"];
    let y = data["y_train"];
    console.log('==================== Y Train ==================');
    console.log(y);
    let history = await model.fit(x, y, {
        batchSize: 64,
        epochs: 50,
        validationData: [data["x_test"], data["y_test"]],
        verbose: 1,
        callbacks: {
            onEpochEnd: async (epoch, log) => {
                console.log(epoch);
                console.log(log);
            }
        }
    });

    let path = `${parameters.modelPath}/model-${symbol.replace('.', '_')}`
    console.log(`Saving model into ${path}`);
    await model.save(path);
}

train().then(() => {
    console.log('Training did end.')
}, err => {
    console.log(err);
});
