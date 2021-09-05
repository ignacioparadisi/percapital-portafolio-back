import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {ExchangeRate} from '@Common/Entities/ExchangeRate';
import {Operation} from '@Common/Entities/Operation';
import {PriceRv} from '@Common/Entities/PriceRv';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const PriceRvResolver = {
    Query: {
        getPriceRvs: async (parent: any, args: GraphQLQuery) => {
            console.info('getPriceRvs parent:', parent, 'args: ',args);
            const where = new PriceRv(args.where)
            const command = CommandFactory.createGetPriceRvsCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    PriceRv: {
        operations: async (parent: PriceRv, args: GraphQLQuery) => {
            console.info('operations parent: ', parent, 'args: ',args)
            const where = new Operation(args.where);
            const command = CommandFactory.createGetOperationsByPriceRvCommand(where, parent, args.limit);
            return command.execute();
        },
        exchangeRate: async (parent: PriceRv, args: GraphQLQuery) => {
            console.info('exchangeRate parent: ', parent, 'args: ',args)
            const where = new ExchangeRate(args.where);
            const command = CommandFactory.createGetExchangeRateByPriceRvCommand(where, parent);
            return command.execute();
        },
        stockExchangeTitle: async (parent: PriceRv, args: GraphQLQuery) => {
            console.info('stockExchangeTitle parent: ', parent, 'args: ',args)
            const where = new StockExchangeTitle(args.where);
            const command = CommandFactory.createGetStockExchangeTitleByPriceRvCommand(where, parent);
            return command.execute();
        },
    },
    Mutation: {
        createPriceRv: async (parent: any, args: GraphQLMutation) => {
            console.info('createPriceRv parent: ', parent, 'args: ',args);
            const createData = new PriceRv(args.insertData);
            const command = CommandFactory.createCreatePriceRvCommand(createData);
            return command.execute();
        },
        updatePriceRv: async (parent: any, args: GraphQLMutation) => {
            console.info('updatePriceRv parent: ', parent, 'args: ',args);
            const where = new PriceRv(args.where);
            const updateData = new PriceRv(args.updateData)
            const command = CommandFactory.createUpdatePriceRvCommand(where, updateData);
            return command.execute();
        },
        deletePriceRv: async (parent: any, args: GraphQLMutation) => {
            console.info('deletePriceRv parent: ', parent, 'args: ',args);
            const deleteData = new PriceRv(args.deleteData);
            const command = CommandFactory.createDeletePriceRvCommand(deleteData);
            return command.execute();
        }
    }
}
