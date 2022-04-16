module.exports = {
    scale: true, // Defines if the data should be scaled between 0 and 1
    lookUpStep: 15, // Days in the future we want to predict
    splitByDate: false, // If the data should be split by day
    shuffle: true, // If the data should be shuffled
    testSize: 0.2, // Percentage of the data to be used as test
    sequenceLength: 50, // Length of the sequence / Window size
    featuresCount: 1, // Number of columns the data has (In this case it's only closePrice)
    units: 256,
    layers: 10, // Number of layers the neural network will have
    bidirectional: false, // Defines if the neural network is bidirectional or unidirectional
    dropout: 0.4,
    batchSize: 64, // Size of the batch
    epochs: 50, // Number of iterations the network will do on train
    loss: "meanAbsoluteError",
    optimizer: "adam",
    modelPath: `file://${process.cwd()}/models`,
    envPath: `${process.cwd()}/.env.prod`
}