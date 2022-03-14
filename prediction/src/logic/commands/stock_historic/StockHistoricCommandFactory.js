'use strict';

const { GetStockFromBVCCommand } = require('./GetStockFromBVC');
const { GetStockHistoricBySymbolCommand } = require('./GetStockHistoricBySymbol');
const { GetPredictionCommand } = require('./GetPrediction');

function createGetStockFromBVC() {
    return new GetStockFromBVCCommand();
}

function createGetStockHistoricBySymbol(symbol, interval) {
    return new GetStockHistoricBySymbolCommand(symbol, interval);
}

function createGetPredictionCommand(symbol) {
    return new GetPredictionCommand(symbol);
}

module.exports = {
    createGetStockFromBVC,
    createGetStockHistoricBySymbol,
    createGetPredictionCommand
}
