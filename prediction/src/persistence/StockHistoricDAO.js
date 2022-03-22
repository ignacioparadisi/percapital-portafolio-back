const {Database} = require("./DB");
const {StockHistoricBDFunctions} = require("./functions/StockHistoricDBFunctions");

class StockHistoricDAO {
    async createMultiple(entities) {
        let query = StockHistoricBDFunctions.insertStocks(JSON.stringify({ data: entities }));
        return await Database.shared.execute(query);
    }

    // async getBySymbol(symbol: string, interval?: string): Promise<StockHistoric[]> {
    //     let query = StockHistoricBDFunctions.getBySymbol(symbol, interval);
    //     return await Database.shared.execute(query, StockHistoric);
    // }
}

module.exports = {
    StockHistoricDAO
}