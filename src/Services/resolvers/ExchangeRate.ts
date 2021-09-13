import {PriceRv} from '@Common/Entities/PriceRv';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const ExchangeRateResolver = {
    Query: {
        getExchangeRates: async (parent: any, args: GraphQLQuery) => {
            console.info('getExchangeRates parent:', parent, 'args: ',args);
            const where = new ExchangeRate(args.where)
            const command = CommandFactory.createGetExchangeRatesCommand(where, args.limit, args.skip);
            return null;
        }
    },
    ExchangeRate: {
        priceRvs: async (parent: ExchangeRate, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRv(args.where);
            const command = CommandFactory.createGetPriceRvsByExchangeRateCommand(where, parent, args.limit);
            return null;
        },
    },
    Mutation: {
        createExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('createExchangeRate parent: ', parent, 'args: ',args);
            const createData = new ExchangeRate(args.insertData);
            const command = CommandFactory.createCreateExchangeRateCommand(createData);
            return null;
        },
        updateExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('updateExchangeRate parent: ', parent, 'args: ',args);
            const where = new ExchangeRate(args.where);
            const updateData = new ExchangeRate(args.updateData)
            const command = CommandFactory.createUpdateExchangeRateCommand(where, updateData);
            return null;
        },
        deleteExchangeRate: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteExchangeRate parent: ', parent, 'args: ',args);
            const deleteData = new ExchangeRate(args.deleteData);
            const command = CommandFactory.createDeleteExchangeRateCommand(deleteData);
            return null;
        }
    }
}
