const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Book {
    title: String
    author: String
}

type Query {
    books: [Book]
}
`;

const books = [{
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
}]

const resolvers = {
    Query: {
        books: () => books
    }
}

const server = new ApolloServer({ typeDefs, resolvers });

const port = process.env.PORT || 4000
server.listen({ port }).then(() => {
    console.info(`🚀 Server ready at ${port}`);
  });
