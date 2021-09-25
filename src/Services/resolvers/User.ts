import { Role } from "@Common/Entities/Role";
import { User } from "@Common/Entities/User";
import { GraphQLMutation, GraphQLQuery } from "@Services/graphQLTypes";

export const UserResolver = {
    Query: {
        login: async (parent: any, args: GraphQLQuery) => {
            console.info('getUser parent:', parent, 'args: ',args);
            const where = new User(args.where as User)
            // const command = CommandFactory.createGetStockExchangeTitlesCommand(where, args.limit, args.skip);
            return null;
        }
    },
    User: {
        roles: async (parent: User, args: GraphQLQuery) => {
            console.info('role parent: ', parent, 'args: ', args)
            const where = new Role(args.where as Role);
            // const command = CommandFactory.createGetPriceRvsByStockExchangeTitleCommand(where, parent, args.limit);
            return null;
        },
    },
    // Mutation: {
    //     createUser: async (parent: any, args: GraphQLMutation) => {
    //         console.info('createUser parent: ', parent, 'args: ',args);
    //         const createData = new User(args.insertData as User);
    //         return null;
    //     },
    //     updateUser: async (parent: any, args: GraphQLMutation) => {
    //         console.info('updateUser parent: ', parent, 'args: ',args);
    //         const where = new User(args.where as User);
    //         const updateData = new User(args.updateData as User);
    //         return null;
    //     },
    //     deleteUser: async (parent: any, args: GraphQLMutation) => {
    //         console.info('deleteUser parent: ', parent, 'args: ',args);
    //         const deleteData = new User(args.deleteData as User);
    //         return null;
    //     }
    // }
}
