import { PriceRV } from '@Common/entities/PriceRV';
import { StockTitle } from '@Common/entities/StockTitle';
import { StockTitleCommandFactory } from '@Logic/commands/stock_title/StockTitleCommandFactory';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const StockTitleResolver = {
    Query: {
        getStockTitles: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockExchangeTitles parent:', parent, 'args: ',args);
            const where = new StockTitle(args.where as StockTitle);
            const command = StockTitleCommandFactory.createGetStockTitlesCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    StockExchangeTitle: {
        priceRvs: async (parent: StockTitle, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRV(args.where as PriceRV);
            return null;
        },
    },
    Mutation: {
        createStockTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('createStockExchangeTitle parent: ', parent, 'args: ',args);
            const createData = new StockTitle(args.insertData as StockTitle);
            const command = StockTitleCommandFactory.createCreateStockTitleCommand(createData);
            return command.execute();
        },
        updateStockTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('updateStockExchangeTitle parent: ', parent, 'args: ',args);
            const where = new StockTitle(args.where as StockTitle);
            const updateData = new StockTitle(args.updateData as StockTitle)
            return null;
        },
        deleteStockTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteStockExchangeTitle parent: ', parent, 'args: ',args);
            const deleteData = new StockTitle(args.deleteData as StockTitle);
            return null;
        }
    }
}
