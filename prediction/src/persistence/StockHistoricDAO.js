const {Database} = require("./DB");
const {StockHistoricBDFunctions} = require("./functions/StockHistoricDBFunctions");

class StockHistoricDAO {
    async createMultiple(entities) {
        let query = StockHistoricBDFunctions.insertStocks(JSON.stringify({ data: entities }));
        return await Database.shared.execute(query);
    }

    async getBySymbol(symbol, interval) {
        let query = StockHistoricBDFunctions.getBySymbol(symbol, interval);
        return await Database.shared.execute(query);
    }

    async getTodayStocks() {
        let query = StockHistoricBDFunctions.getTodayStocks();
        return await Database.shared.execute(query);
    }
}

module.exports = {
    StockHistoricDAO
}