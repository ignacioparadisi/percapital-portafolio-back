import { PriceRV } from '@Common/Entities/PriceRV';
import { ExchangeRate } from '@Common/Entities/ExchangeRate';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const ExchangeRateResolver = {
    Query: {
        getExchangeRates: async (parent: any, args: GraphQLQuery) => {
            console.info('getExchangeRates parent:', parent, 'args: ',args);
            const where = new ExchangeRate(args.where)
            return null;
        }
    },
    ExchangeRate: {
        priceRvs: async (parent: ExchangeRate, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRV(args.where);
            return null;
        },
    },
    Mutation: {
        createExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('createExchangeRate parent: ', parent, 'args: ',args);
            const createData = new ExchangeRate(args.insertData);
            return null;
        },
        updateExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('updateExchangeRate parent: ', parent, 'args: ',args);
            const where = new ExchangeRate(args.where);
            const updateData = new ExchangeRate(args.updateData)
            return null;
        },
        deleteExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteExchangeRate parent: ', parent, 'args: ',args);
            const deleteData = new ExchangeRate(args.deleteData);
            return null;
        }
    }
}
