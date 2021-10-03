import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { resolvers } from '@Services/resolvers/index';
import { typeDefs } from '@Services/schemas/index';
import { UserCommandFactory } from '@Logic/commands/user/UserCommandFactory';
import { User } from '@Common/entities/User';

config({ path: `${process.cwd()}/.env` });

const server = new ApolloServer({ 
    typeDefs: typeDefs, 
    resolvers: resolvers,
    introspection: true,
    plugins: [
       ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: async ({ req }) => {
        if (!req.body.query.includes('login')) {
            const userId = req.headers.authorization;
            if (!userId) {
                throw new Error('Permission Denied');
            }
            const headerUser = new User();
            headerUser.id = Number(userId);
            const command =  UserCommandFactory.createGetUsersCommand(headerUser);
            const users = await command.execute();
            if (users.length == 1) {
                return { user: users[0] };
            }
            throw new Error('Permission Denied');
        }
    }
});

const port = process.env.PORT || 4000
server.listen({ port }).then(() => {
    console.info(`🚀 Server ready at ${port}`);
});