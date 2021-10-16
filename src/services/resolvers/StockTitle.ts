import { PriceRV } from '@Common/entities/PriceRV';
import { StockTitle } from '@Common/entities/StockTitle';
import { Page } from '@Common/utils/Page';
import { PriceRVCommandFactory } from '@Logic/commands/price_rv/PriceRVCommandFactory';
import { StockTitleCommandFactory } from '@Logic/commands/stock_title/StockTitleCommandFactory';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';

export const StockTitleResolver = {
    Query: {
        getStockTitles: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockTitles parent:', parent, 'args: ',args);
            const where = new StockTitle(args.where as StockTitle);
            const command = StockTitleCommandFactory.createGetStockTitlesCommand(where, args.limit, args.skip);
            const result = await command.execute();
            let page = new Page<StockTitle>(result, 0);
            if (result.length > 0) {
                if (result[0].total) {
                    page.total = result[0].total;
                }
            }
            return page;
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
