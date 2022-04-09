const {Database} = require("./DB");
const {StockHistoricBDFunctions} = require("./functions/StockHistoricDBFunctions");

class StockHistoricDAO {
    async createMultiple(entities) {
        let query = StockHistoricBDFunctions.insertStocks(JSON.stringify({ data: entities }));
        let result = await Database.shared.execute(query);
        let syncQuery = StockHistoricBDFunctions.syncTitlesAndStocks();
        Database.shared.execute(syncQuery);
        return result;
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