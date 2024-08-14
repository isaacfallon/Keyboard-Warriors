const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    scores: [Score]!
  }

  type Score {
    _id: ID
    wordCount: Int
    letterCount: Int
    scoreAuthor: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    scores(username: String): [Score]
    score(scoreId: ID!): Score
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addScore(wordCount: Int!, letterCount: Int!): Score
    removeScore(scoreId: ID!): Score
  }
`;

module.exports = typeDefs;
