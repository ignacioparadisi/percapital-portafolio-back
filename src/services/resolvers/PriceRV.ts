import { StockTitle } from '@Common/entities/StockTitle';
import { ExchangeRate } from '@Common/entities/ExchangeRate';
import { Operation } from '@Common/entities/Operation';
import { PriceRV } from '@Common/entities/PriceRV';
import { GraphQLMutation, GraphQLQuery } from '../graphQLTypes';
import { PriceRVCommandFactory } from '@Logic/commands/price_rv/PriceRVCommandFactory';
import { ExchangeRateCommandFactory } from '@Logic/commands/exchange_rate/ExchangeRateCommandFactory';
import { StockTitleCommandFactory } from '@Logic/commands/stock_title/StockTitleCommandFactory';
import { Page } from '@Common/utils/Page';

export const PriceRVResolver = {
    Query: {
        getPriceRVs: async (parent: any, args: GraphQLQuery) => {
            console.info('getPriceRvs parent:', parent, 'args: ',args);
            const where = new PriceRV(args.where as PriceRV);
            const command = PriceRVCommandFactory.createGetPriceRVsCommand(where, args.limit, args.skip);
            const result = await command.execute();
            let page = Page.decode(result);
            return page;
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
            const where = new ExchangeRate();
            where.id = parent.exchangeRateId;
            const command = ExchangeRateCommandFactory.createGetExchangeRateByIdCommand(where);
            let result = await command.execute();
            if (result.length > 0) {
                return result[0];
            }
            return null;
        },
        stockTitle: async (parent: PriceRV, args: GraphQLQuery) => {
            console.info('stockTitle parent: ', parent, 'args: ',args)
            const where = new StockTitle();
            where.id = parent.titleId;
            const command = StockTitleCommandFactory.createGetStockTitleByIdCommand(where);
            let result = await command.execute();
            if (result.length > 0) {
                return result[0];
            }
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
