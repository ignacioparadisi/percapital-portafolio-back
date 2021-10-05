import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { resolvers } from '@Services/resolvers/index';
import { typeDefs } from '@Services/schemas/index';
import { UserCommandFactory } from '@Logic/commands/user/UserCommandFactory';
import { User } from '@Common/entities/User';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { authDirectiveTransformer } from '@Services/directives/AuthDirective';

config({ path: `${process.cwd()}/.env` });

// @ts-ignore
const context = async ({ req }) => {
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

let schema = makeExecutableSchema({
    typeDefs,
    resolvers
});
schema = authDirectiveTransformer(schema, 'auth');

const server = new ApolloServer({ 
    schema,
    introspection: true,
    context: ({ req }) => {
        return { headers: req.headers }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground(),
    ]
});

const port = process.env.PORT || 4000
server.listen({ port }).then(() => {
    console.info(`🚀 Server ready at ${port}`);
});

// "start": "webpack --config webpack.config.js && node dist/server.js",