import {PriceRv} from '@Common/Entities/PriceRv';
import {StockExchangeTitle} from '@Common/Entities/StockExchangeTitle';
import {CommandFactory} from '@Logic/Commands/CommandFactory';
import {GraphQLMutation, GraphQLQuery} from '../graphQLTypes';
export const StockExchangeTitleResolver = {
    Query: {
        getStockExchangeTitles: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockExchangeTitles parent:', parent, 'args: ',args);
            const where = new StockExchangeTitle(args.where)
            const command = CommandFactory.createGetStockExchangeTitlesCommand(where, args.limit, args.skip);
            return command.execute();
        }
    },
    StockExchangeTitle: {
        priceRvs: async (parent: StockExchangeTitle, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRv(args.where);
            const command = CommandFactory.createGetPriceRvsByStockExchangeTitleCommand(where, parent, args.limit);
            return command.execute();
        },
    },
    Mutation: {
        createStockExchangeTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('createStockExchangeTitle parent: ', parent, 'args: ',args);
            const createData = new StockExchangeTitle(args.insertData);
            const command = CommandFactory.createCreateStockExchangeTitleCommand(createData);
            return command.execute();
        },
        updateStockExchangeTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('updateStockExchangeTitle parent: ', parent, 'args: ',args);
            const where = new StockExchangeTitle(args.where);
            const updateData = new StockExchangeTitle(args.updateData)
            const command = CommandFactory.createUpdateStockExchangeTitleCommand(where, updateData);
            return command.execute();
        },
        deleteStockExchangeTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteStockExchangeTitle parent: ', parent, 'args: ',args);
            const deleteData = new StockExchangeTitle(args.deleteData);
            const command = CommandFactory.createDeleteStockExchangeTitleCommand(deleteData);
            return command.execute();
        }
    }
}
