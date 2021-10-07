import { PriceRV } from '@Common/entities/PriceRV';
import { ExchangeRate } from '@Common/entities/ExchangeRate';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';
import { ExchangeRateCommandFactory } from '@Logic/commands/exchange_rate/ExchangeRateCommandFactory';

export const ExchangeRateResolver = {
    Query: {
        getExchangeRates: async (parent: any, args: GraphQLQuery) => {
            console.info('getExchangeRates parent:', parent, 'args: ',args);
            const where = new ExchangeRate(args.where as ExchangeRate)
            return ExchangeRateCommandFactory.createGetExchangeRatesCommand(where, args.limit, args.skip);
        }
    },
    ExchangeRate: {
        priceRvs: async (parent: ExchangeRate, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRV(args.where as PriceRV);
            return null;
        },
    },
    Mutation: {
        createExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('createExchangeRate parent: ', parent, 'args: ',args);
            const createData = new ExchangeRate(args.insertData as ExchangeRate);
            return ExchangeRateCommandFactory.createCreateExchangeRateCommand(createData);
        },
        updateExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('updateExchangeRate parent: ', parent, 'args: ',args);
            const where = new ExchangeRate(args.where as ExchangeRate);
            const updateData = new ExchangeRate(args.updateData as ExchangeRate)
            return null;
        },
        deleteExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteExchangeRate parent: ', parent, 'args: ',args);
            const deleteData = new ExchangeRate(args.deleteData as ExchangeRate);
            return null;
        }
    }
}
