const StockHistoricCommandFactory = require('../../logic/commands/stock_historic/StockHistoricCommandFactory');

module.exports = {
    StockHistoricResolver: {
        Query: {
            getStockFromBVC: async (parent, args) => {
                console.info('getStockFromBVC parent:', parent, 'args: ',args);
                let command = StockHistoricCommandFactory.createGetStockFromBVC();
                return command.execute();
            },
            getStockHistoricBySymbol: async (parent, args) => {
                console.info('getStockHistoricBySymbol parent:', parent, 'args: ',args);
                let command = StockHistoricCommandFactory.createGetStockHistoricBySymbol(args.symbol, args.interval);
                return command.execute();
            },
            getPrediction: async (parent, args) => {
                console.info('getPrediction parent:', parent, 'args: ',args);
                let command = StockHistoricCommandFactory.createGetPredictionCommand(args.symbol, args.lookUpDays);
                return command.execute();
            },
            getTodayStocks: async (parent, args) => {
                console.info('getTodayStocks parent:', parent, 'args: ', args);
                let command = StockHistoricCommandFactory.createGetTodayStocksCommand();
                return command.execute();
            }
        },
        Mutation: {
            createStockHistoric: async (parent, args) => {
                console.info('createGetStockHsitoric parent: ', parent, 'args: ', args);
                const command = StockHistoricCommandFactory.createCreateStockHistoricCommand(args.insertData);
                return command.execute();
            }
        }
    }
}