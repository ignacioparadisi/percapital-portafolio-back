import { PriceRV } from '@Common/entities/PriceRV';
import { StockTitle } from '@Common/entities/StockTitle';
import { Page } from '@Common/utils/Page';
import { PriceRVCommandFactory } from '@Logic/commands/price_rv/PriceRVCommandFactory';
import { StockTitleCommandFactory } from '@Logic/commands/stock_title/StockTitleCommandFactory';
import { ExecutionContext } from 'graphql/execution/execute';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const StockTitleResolver = {
    Query: {
        getStockTitles: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockTitles parent:', parent, 'args: ',args);
            const where = new StockTitle(args.where as StockTitle);
            const command = StockTitleCommandFactory.createGetStockTitlesCommand(where, args.limit, args.skip);
            const result = await command.execute();
            let page = Page.decode(result);
            return page;
        },
        getStockTitlesWithAmount: async (parent: any, args: GraphQLQuery, context: ExecutionContext) => {
            console.info('getStockTitlesWithAmount parent:', parent, 'args: ',args);
            // @ts-ignore
            const userId = context.user.id;
            const command = StockTitleCommandFactory.createGetStockTitlesWithAmountCommand(userId);
            const result = await command.execute();
            return result;
        }
    },
    StockTitle: {
        priceRvs: async (parent: StockTitle, args: GraphQLQuery) => {
            console.info('priceRvs parent: ', parent, 'args: ',args)
            const where = new PriceRV();
            where.titleId = parent.id;
            const command = PriceRVCommandFactory.createGetPriceRVByTitleCommand(where);
            let result = await command.execute();
            if (result.length > 0) {
                return result;
            }
            return null;
        },
    },
    Mutation: {
        createStockTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('createStockTitle parent: ', parent, 'args: ',args);
            const createData = new StockTitle(args.insertData as StockTitle);
            const command = StockTitleCommandFactory.createCreateStockTitleCommand(createData);
            return command.execute();
        },
        updateStockTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('updateStockTitle parent: ', parent, 'args: ',args);
            const where = new StockTitle(args.where as StockTitle);
            const updateData = new StockTitle(args.updateData as StockTitle)
            return null;
        },
        deleteStockTitle: async (parent: any, args: GraphQLMutation) => {
            console.info('deleteStockTitle parent: ', parent, 'args: ',args);
            const deleteData = new StockTitle(args.deleteData as StockTitle);
            return null;
        }
    }
}
