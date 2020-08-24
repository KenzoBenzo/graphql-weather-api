const { ApolloServer } = require("apollo-server");
const schema = require("./schema");

const server = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  engine: {
    reportSchema: true,
    variant: "current",
  },
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
