const { test } = require('../../../../scripts/test');

class GetPredictionCommand {
    symbol;
    constructor(symbol) {
        this.symbol = symbol;
    }
    async execute() {
        let result = await test(this.symbol);
        console.log(result);
        return result;
    }
}

module.exports = {
    GetPredictionCommand
}