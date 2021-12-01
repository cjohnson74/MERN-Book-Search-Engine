const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String! @unique
        email: String! @unique @constraint(format: "email")
        password: String!
        savedBooks: [Book]
    }

    type Query {
        users: [User]
        books: [Book]
    }

    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }
`;

module.exports = typeDefs;