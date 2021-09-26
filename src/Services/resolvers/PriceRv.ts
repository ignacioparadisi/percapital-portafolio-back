import { StockExchangeTitle } from '@Common/Entities/StockExchangeTitle';
import { ExchangeRate } from '@Common/Entities/ExchangeRate';
import { Operation } from '@Common/Entities/Operation';
import { PriceRV } from '@Common/Entities/PriceRV';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const PriceRVResolver = {
    Query: {
        getPriceRVs: async (parent: any, args: GraphQLQuery) => {
            console.info('getPriceRvs parent:', parent, 'args: ',args);
            const where = new PriceRV(args.where as PriceRV)
            return null;
        }
    },
    PriceRV: {
        operations: async (parent: PriceRV, args: GraphQLQuery) => {
            console.info('operations parent: ', parent, 'args: ',args)
            const where = new Operation(args.where as Operation);
            return null;
        },
        exchangeRate: async (parent: PriceRV, args: GraphQLQuery) => {
            console.info('exchangeRate parent: ', parent, 'args: ',args)
            const where = new ExchangeRate(args.where);
            return null;
        },
        stockExchangeTitle: async (parent: PriceRV, args: GraphQLQuery) => {
            console.info('stockExchangeTitle parent: ', parent, 'args: ',args)
            const where = new StockExchangeTitle(args.where);
            return null;
        },
    },
    Mutation: {
        createPriceRV: async (parent: any, args: GraphQLMutation) => {
            console.info('createPriceRv parent: ', parent, 'args: ',args);
            const createData = new PriceRV(args.insertData as PriceRV);
            return null;
        },
        updatePriceRV: async (parent: any, args: GraphQLMutation) => {
            console.info('updatePriceRv parent: ', parent, 'args: ',args);
            const where = new PriceRV(args.where as PriceRV);
            const updateData = new PriceRV(args.updateData as PriceRV)
            return null;
        },
        deletePriceRV: async (parent: any, args: GraphQLMutation) => {
            console.info('deletePriceRv parent: ', parent, 'args: ',args);
            const deleteData = new PriceRV(args.deleteData as PriceRV);
            return null;
        }
    }
}
