'use strict';

// import { StockHistoric } from "@Common/entities/StockHistoric";
// import { StockHistoricDAO } from "@Persistence/dao/stock_historic/StockHistoricDAO";

class GetStockHistoricBySymbolCommand {
    symbol;
    interval;

    constructor(symbol, interval) {
        this.symbol = symbol;
        this.interval = interval;
    }

    execute() {
        return null;
    }
}

module.exports = {
    GetStockHistoricBySymbolCommand
}