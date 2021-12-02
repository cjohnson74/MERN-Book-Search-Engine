const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String! @unique
        email: String! @unique @constraint(format: 'email')
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Mutation {
        login(input: LoginInput): Auth
        addUser(input: AddUserInput): Auth
        saveBook(input: SaveBookInput): User
        removeBook(bookId: String!): User
    }

    input SaveBookInput: {
        authors: [String]
        description: String!
        title: String!
        bookId: String!
        link: String
        image: String
    }

    input AddUserInput: {
        username: String! @unique
        email: String! @unique @constraint(format: 'email')
        password: String!
    }

    input LoginInput {
        email: String! @unique @constraint(format: 'email')
        password: String!
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