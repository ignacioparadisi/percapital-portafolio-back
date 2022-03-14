import {GraphQLQuery} from "@Services/graphQLTypes";
import {StockHistoricCommandFactory} from "@Logic/commands/stock_historic/StockHistoricCommandFactory";
import {StockHistoric} from "@Common/entities/StockHistoric";

export const StockHistoricResolver = {
    Query: {
        getStockFromBVC: async (parent: any, args: GraphQLQuery) => {
            let command = StockHistoricCommandFactory.createGetStockFromBVC();
            return command.execute();
        },
        getStockHistoricBySymbol: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockHistoricBySymbol parent:', parent, 'args: ',args);
            let command = StockHistoricCommandFactory.createGetStockHistoricBySymbol(args.symbol ?? '', args.interval)
            return command.execute();
        }
    }
}