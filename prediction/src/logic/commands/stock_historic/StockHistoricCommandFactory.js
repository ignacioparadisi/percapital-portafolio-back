'use strict';

const { GetStockFromBVCCommand } = require('./GetStockFromBVC');
const { GetStockHistoricBySymbolCommand } = require('./GetStockHistoricBySymbol');
const { GetPredictionCommand } = require('./GetPrediction');
const {CreateStockHistoricCommand} = require("./CreateStockHistoric");
const {GetTodayStocks, GetTodayStocksCommand} = require("./GetTodayStocks");

function createGetStockFromBVC() {
    return new GetStockFromBVCCommand();
}

function createGetStockHistoricBySymbol(symbol, interval) {
    console.info('createGetStockHistoricBySymbol');
    return new GetStockHistoricBySymbolCommand(symbol, interval);
}

function createGetPredictionCommand(symbol, lookUpStep) {
    return new GetPredictionCommand(symbol, lookUpStep);
}

function createCreateStockHistoricCommand(stockHistoric) {
    return new CreateStockHistoricCommand(stockHistoric);
}

function createGetTodayStocksCommand() {
    return new GetTodayStocksCommand();
}

module.exports = {
    createGetStockFromBVC,
    createGetStockHistoricBySymbol,
    createGetPredictionCommand,
    createCreateStockHistoricCommand,
    createGetTodayStocksCommand
}
