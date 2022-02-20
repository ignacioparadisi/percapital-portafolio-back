module.exports = {
    scale: true,
    lookUpStep: 15,
    stepsCount: 50,
    splitByDate: false,
    shuffle: true,
    testSize: 0.2,
    sequenceLength: 50,
    featuresCount: 1,
    units: 256,
    layers: 2,
    bidirectional: false,
    dropout: 0.4,
    loss: "meanAbsoluteError",
    optimizer: "adam"
}