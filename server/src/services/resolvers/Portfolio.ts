import { Portfolio } from "@Common/entities/Portfolio";
import { PortfolioPage } from "@Common/utils/PortfolioPage";
import { PortfolioCommandFactory } from "@Logic/commands/portfolio/PorfolioCommandFactory";
import { GraphQLQuery } from "@Services/graphQLTypes";
import { ExecutionContext } from "graphql/execution/execute";

export const PortfolioResolver = {
    Query: {
        getPortfolio: async (parent: any, args: GraphQLQuery, context: ExecutionContext) => {
            console.info('getPortfolio parent:', parent, 'args: ',args);
            const where = new Portfolio(args.where as Portfolio);
            // @ts-ignore
            where.userId = context.user.id;
            const command = PortfolioCommandFactory.createGetPortfolioCommand(where, args.limit, args.skip);
            const result = await command.execute();
            let page = PortfolioPage.decode(result);
            return page;
        }
    }
}
