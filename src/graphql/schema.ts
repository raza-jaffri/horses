import { ApolloServer, gql } from "apollo-server"

export const schema = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Breed {
    id: Int
    name: String
    origin: String
    picture: String
    biography: String
    bloodType: String
  }
  enum BloodType {
    WARM
    COLD
    UNKNOWN
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    breeds(name: String, origin: String, bloodType: String): [Breed]
    breed(name: String!): Breed
    origin(origin: String!): [Breed]
    existingBreeds(name: String): Boolean
  }

  type Mutation {
    addBreed(
      name: String!
      origin: String
      bloodType: BloodType
      colour: String
      biography: String
      picture: String
    ): Boolean

    updateBreed(
      id: Int!
      name: String
      origin: String
      bloodType: BloodType
      colour: String
      biography: String
      picture: String
    ): Int

    deleteBreed(id: Int!): Boolean
  }
`
