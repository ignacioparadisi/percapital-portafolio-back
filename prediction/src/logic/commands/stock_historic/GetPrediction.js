const { test } = require('../../../../scripts/test');

class GetPredictionCommand {
    symbol;
    lookUpStep;
    constructor(symbol, lookUpStep) {
        this.symbol = symbol;
        this.lookUpStep = lookUpStep;
    }
    async execute() {
        let result = await test(this.symbol, this.lookUpStep);
        console.log(result);
        return result;
    }
}

module.exports = {
    GetPredictionCommand
}