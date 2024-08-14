const { User, Score } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('scores');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('scores');
    },
    scores: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Score.find(params).sort({ createdAt: -1 });
    },
    score: async (parent, { scoreId }) => {
      return Score.findOne({ _id: scoreId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('scores');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addScore: async (parent, { wordCount, letterCount }, context) => {
      if (context.user) {
        const score = await Score.create({
          wordCount,
          letterCount,
          scoreAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { scores: score._id } }
        );

        return score;
      }
      throw AuthenticationError;
    },
    removeScore: async (parent, { scoreId }, context) => {
      if (context.user) {
        const score = await Score.findOneAndDelete({
          _id: scoreId,
          scoreAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { scores: score._id } }
        );

        return score;
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
