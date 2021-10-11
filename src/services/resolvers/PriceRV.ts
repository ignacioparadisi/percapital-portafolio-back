import { StockTitle } from '@Common/entities/StockTitle';
import { ExchangeRate } from '@Common/entities/ExchangeRate';
import { Operation } from '@Common/entities/Operation';
import { PriceRV } from '@Common/entities/PriceRV';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';
import { PriceRVCommandFactory } from '@Logic/commands/price_rv/PriceRVCommandFactory';

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
            const where = new ExchangeRate(args.where as ExchangeRate);
            return null;
        },
        stockTitle: async (parent: PriceRV, args: GraphQLQuery) => {
            console.info('stockTitle parent: ', parent, 'args: ',args)
            const where = new StockTitle(args.where as StockTitle);
            return null;
        },
    },
    Mutation: {
        createPriceRV: async (parent: any, args: GraphQLMutation) => {
            console.info('createPriceRv parent: ', parent, 'args: ',args);
            const createData = new PriceRV(args.insertData as PriceRV);
            const command = PriceRVCommandFactory.createCreatePriceRVCommand(createData);
            return command.execute();
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
