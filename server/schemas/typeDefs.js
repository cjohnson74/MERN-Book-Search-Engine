const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String! @unique
        email: String! @unique @constraint(format: "email")
        bookCount: Number
        savedBooks: [Book]
    }

    type Query {
        users: [User]
        books: [Book]
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