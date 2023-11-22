const { ApolloServer } = require("apollo-server"); //ApolloServer is being initialized to set up a GraphQL server
const { importSchema } = require("graphql-import");//importSchema is used to import the GraphQL schemas from the schema.graphql file
const EtherDataSource = require("./datasource/ethDatasource");//EtherDataSource data source is defined and passed to the ApolloServer to resolve the GraphQL
const typeDefs = importSchema("./schema.graphql");//load schema

require("dotenv").config();//

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>// Resolver to get ether balance
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>//Resolver to get ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>//Resolver to get latest ether price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>//Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({//create Apollo
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),//Instantiate data source
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {// start server on port 9000
  console.log(`🚀 Server ready at ${url}`);
});
