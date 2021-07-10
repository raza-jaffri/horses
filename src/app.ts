import { ApolloServer, gql } from "apollo-server"
import { schema } from "./graphql/schema"
import { resolvers } from "./graphql/resolvers"
import { MongoDb } from "./mongodb"

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const server = new ApolloServer({ typeDefs: schema, resolvers })

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
  new MongoDb().connect()
})
