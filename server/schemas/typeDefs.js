const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String! @unique
        email: String! @unique @constraint(format: 'email')
        bookCount: Number
        savedBooks: [Book]
    }

    type Query {
        users: [User]
        books: [Book]
    }

    type Mutation {
        login(email: String! @unique @constraint(format: 'email'), password: String!): Auth
        addUser(username: String! @unique, email: String! @unique @constraint(format: 'email'), password: String!): Auth
        saveBook(input: SaveBookInput): User
    }

    input SaveBookInput: {
        authors: [String]
        description: String!
        title: String!
        bookId: String!
        link: String
    }

    type Book {
        bookId: String!
        authors: [String]
        description: String!
        image: String
        link: String
        title: String!
    }

    type Auth {
        token: String!
        user: User
    }
`;

module.exports = typeDefs;