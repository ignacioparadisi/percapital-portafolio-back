const { ApolloServer } = require('apollo-server');
const { config } = require('dotenv');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { typeDefs } = require('./services/schemas');
const { resolvers} = require('./services/resolvers');

config({ path: `${process.cwd()}/.env` });
console.info(`${process.cwd()}/.env`);

let schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

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

const port = process.env.PORT || 4001
server.listen({ port }).then(() => {
    console.info(`🚀 Server ready at ${port}`);
});