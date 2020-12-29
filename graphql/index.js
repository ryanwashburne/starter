const { ApolloServer, gql } = require("apollo-server-lambda");
const {
  typeDefs: scalarTypeDefs,
  resolvers: scalarResolvers,
  mocks: scalarMocks,
} = require("graphql-scalars");

class GraphQLServer {
  server;

  constructor({ types, resolvers = {}, context, shouldMock = false }) {
    const typeDefs = gql`
      ${types}
      type Query {
        hello: String
      }
      type Mutation {
        echo(input: String!): String!
      }
    `;

    const resolvers = {
      Query: {
        ...resolvers.query,
        hello: () => "Hello, world!",
      },
      Mutation: {
        ...resolvers.mutation,
        echo: (_, { input }) => input,
      },
    };

    this.server = new ApolloServer({
      typeDefs: [...scalarTypeDefs, typeDefs],
      resolvers: [scalarResolvers, resolvers],
      mocks: shouldMock ? scalarMocks : undefined,
      context,
    });
  }

  createHandler() {
    return this.server.createHandler({
      cors: {
        origin: true,
        credentials: true,
      },
    });
  }
}

module.exports = GraphQLServer;
