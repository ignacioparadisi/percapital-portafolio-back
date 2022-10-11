import { ReportsCommandFactory } from "@Logic/commands/reports/ReportsCommandFactory";
import { GraphQLQuery } from "@Services/graphQLTypes";

export const ReportResolver = {
    Query: {
        getReports: async (parent: any, args: GraphQLQuery) => {
            console.info('getStockTitles parent:', parent, 'args: ',args);
            const command = ReportsCommandFactory.createGetReportsCommand();
            const result = await command.execute();
            return result;
        }
    }
}