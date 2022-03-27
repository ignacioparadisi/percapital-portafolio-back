'use strict';

const {StockHistoricDAO} = require("../../../persistence/StockHistoricDAO");

class GetStockHistoricBySymbolCommand {
    symbol;
    interval;

    constructor(symbol, interval) {
        this.symbol = symbol;
        this.interval = interval;
    }

    async execute() {
        const historic = await new StockHistoricDAO().getBySymbol(this.symbol, this.interval);
        return historic.map(item => {
            return {
                id: item.sh_id,
                symbol: item.sh_symbol,
                date: item.sh_stock_date,
                closePrice: item.sh_close_price,
                openPrice: item.sh_open_price,
                highPrice: item.sh_high_price,
                lowPrice: item.sh_low_price,
                volume: item.sh_volume,
                change: item.sh_change
            }
        });
    }
}

module.exports = {
    GetStockHistoricBySymbolCommand
}