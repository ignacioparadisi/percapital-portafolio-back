import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { resolvers } from '@Services/resolvers/index';
import { typeDefs } from '@Services/schemas/index';
import { UserCommandFactory } from '@Logic/Commands/User/UserCommandFactory';
import { User } from '@Common/Entities/User';

config({ path: `${process.cwd()}/.env` });

const server = new ApolloServer({ 
    typeDefs: typeDefs, 
    resolvers: resolvers,
    introspection: true,
    plugins: [
       ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req }) => {
        console.log('Includes', req.body.query.includes('login'));
        if (!req.body.query.includes('login')) {
            const userId = req.headers.authorization;
            if (!userId) throw new Error('you must be logged in');
            const headerUser = new User();
            headerUser.id = Number(userId);
            const user = UserCommandFactory.createGetUsersCommand(headerUser);
            return { user };
        }
    }
});

const port = process.env.PORT || 4000
server.listen({ port }).then(() => {
    console.info(`🚀 Server ready at ${port}`);
});