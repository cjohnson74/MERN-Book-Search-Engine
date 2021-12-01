const { User } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');

module.exports = resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const foundUser = await User.findOne({
                    _id: context.user._id
                })
                .select('-__v -password')
                return foundUser;
            }
            throw new AuthenticationError("Need to be logged in");
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);

            const token = signToken(user)

            return { token, user };
        }
    }
}

