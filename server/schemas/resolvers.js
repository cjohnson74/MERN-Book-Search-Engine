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
        $or: [{ username: args.username }, { email: args.email }],
      });
      if (!user) {
         throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(args.password);

      if (!correctPw) {
          throw new AuthenticationError("Incorrect Credentials");
      }

      const token = signToken(user);
      
      return { token, user};
    },
  },
};
