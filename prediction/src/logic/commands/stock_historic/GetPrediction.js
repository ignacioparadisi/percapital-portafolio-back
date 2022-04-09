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
        result.symbol = this.symbol;
        return result;
    }
}

module.exports = {
    GetPredictionCommand
}