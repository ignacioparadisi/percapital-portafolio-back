import { PriceRV } from '@Common/Entities/PriceRV';
import { StockExchangeTitle } from '@Common/Entities/StockExchangeTitle';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const StockExchangeTitleResolver = {
    Query: {
        getStockExchangeTitles: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockExchangeTitles parent:', parent, 'args: ',args);
            const where = new StockExchangeTitle(args.where)
            return null;
        }
    },
    StockExchangeTitle: {
        priceRvs: async (parent: StockExchangeTitle, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRV(args.where as PriceRV);
            return null;
        },
    },
    Mutation: {
        createStockExchangeTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('createStockExchangeTitle parent: ', parent, 'args: ',args);
            const createData = new StockExchangeTitle(args.insertData);
            return null;
        },
        updateStockExchangeTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('updateStockExchangeTitle parent: ', parent, 'args: ',args);
            const where = new StockExchangeTitle(args.where);
            const updateData = new StockExchangeTitle(args.updateData)
            return null;
        },
        deleteStockExchangeTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteStockExchangeTitle parent: ', parent, 'args: ',args);
            const deleteData = new StockExchangeTitle(args.deleteData);
            return null;
        }
    }
}
