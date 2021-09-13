import { ApolloServer } from 'apollo-server';
import { config } from 'dotenv';

import { resolvers } from '@Services/resolvers/index';
import { typeDefs } from '@Services/schemas/index';

config({ path: `${process.cwd()}/.env` });

const server = new ApolloServer({ 
    typeDefs, 
    resolvers
});

const port = process.env.PORT || 4000
server.listen({ port }).then(() => {
    console.info(`🚀 Server ready at ${port}`);
});
