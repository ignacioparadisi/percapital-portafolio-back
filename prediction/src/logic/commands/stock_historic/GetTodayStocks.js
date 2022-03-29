const { StockHistoric } = require('../../../common/StockHistoric');
const { StockHistoricDAO } = require("../../../persistence/StockHistoricDAO");

class GetTodayStocks {
    async execute() {
        let results = await new StockHistoricDAO().getTodayStocks().map(item => {
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
        return results;
    }
}