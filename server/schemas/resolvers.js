const { User } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

module.exports = resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const foundUser = await User.findOne({
          _id: context.user._id,
        }).select("-__v -password");
        return foundUser;
      }
      throw new AuthenticationError("Need to be logged in");
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, args) => {
      const user = await User.findOne({
          email: args.input.email
      });
      console.log(user)
      if (!user) {
         throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(args.input.password);

      if (!correctPw) {
          throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);

      return { token, user};
    },
    saveBook: async (parent, args, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $addToSet: { savedBooks: args.input }},
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id");
            }
            return updatedUser;
        }
        throw new AuthenticationError("Must be logged in");
    },
    removeBook: async (parent, args, context) => {
        if (context.user) {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedBooks: { bookId: args.bookId } } },
                { new: true }
            );
            return updatedUser;
        }
        throw new AuthenticationError("Must be logged in");
    },
  },
};
