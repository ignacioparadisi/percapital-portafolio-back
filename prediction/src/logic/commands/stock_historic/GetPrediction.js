const { test } = require('../../../../scripts/test');

class GetPredictionCommand {
    symbol;
    constructor(symbol) {
        this.symbol = symbol;
    }
    async execute() {
        return test(this.symbol);
    }
}

module.exports = {
    GetPredictionCommand
}