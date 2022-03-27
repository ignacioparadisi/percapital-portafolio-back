'use strict';

const { GetStockFromBVCCommand } = require('./GetStockFromBVC');
const { GetStockHistoricBySymbolCommand } = require('./GetStockHistoricBySymbol');
const { GetPredictionCommand } = require('./GetPrediction');
const {CreateStockHistoricCommand} = require("./CreateStockHistoric");

function createGetStockFromBVC() {
    return new GetStockFromBVCCommand();
}

function createGetStockHistoricBySymbol(symbol, interval) {
    return new GetStockHistoricBySymbolCommand(symbol, interval);
}

function createGetPredictionCommand(symbol) {
    return new GetPredictionCommand(symbol);
}

function createCreateStockHistoricCommand(stockHistoric) {
    return new CreateStockHistoricCommand(stockHistoric);
}

module.exports = {
    createGetStockFromBVC,
    createGetStockHistoricBySymbol,
    createGetPredictionCommand,
    createCreateStockHistoricCommand
}
