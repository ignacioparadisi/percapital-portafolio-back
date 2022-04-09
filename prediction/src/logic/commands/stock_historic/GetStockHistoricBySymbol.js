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
        console.log(historic);
        return historic.map(item => {
            let date = new Date(+item.sh_stock_date);
            let price = item.sh_close_price;
            if (date < new Date('2021-10-01')) {
                price /= 1000000;
            }
            if (date < new Date('2018-08-20')) {
                price /= 100000;
            }
            return {
                id: item.sh_id,
                symbol: item.sh_symbol,
                symbolDescription: item.sh_symbol_description,
                date: item.sh_stock_date,
                closePrice: price,
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