import { User } from "@Common/entities/User";
import { UserCommandFactory } from "@Logic/commands/user/UserCommandFactory";
import { GraphQLMutation, GraphQLQuery } from "@Services/graphQLTypes";

export const UserResolver = {
    Query: {
        getUsers: async (parent: any, args: GraphQLQuery) => {
            console.info('getUsers parent:', parent, 'args: ',args);
            const where = new User(args.where as User)
            const command = UserCommandFactory.createGetUsersCommand(where);
            return command.execute();
        },
        login: async (parent: any, args: GraphQLQuery) => {
            console.info('login parent:', parent, 'args: ',args);
            const where = new User(args.where as User)
            const command = UserCommandFactory.createLoginCommand(where);
            return command.execute();
        }
    },
    User: {
        roles: async (parent: User, args: GraphQLQuery) => {
            console.info('role parent: ', parent, 'args: ', args)
            const command = UserCommandFactory.createGetRolesCommand(parent);
            return command.execute();
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
