import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      scores {
        _id
        wordCount
        letterCount
        createdAt
      }
    }
  }
`;

export const QUERY_SCORES = gql`
  query getScores {
    scores {
      _id
      wordCount
      letterCount
      scoreAuthor
      createdAt
    }
  }
`;

export const QUERY_SINGLE_score = gql`
  query getSingleScore($scoreId: ID!) {
    score(scoreId: $scoreId) {
      _id
      wordCount
      letterCount
      scoreAuthor
      createdAt
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      scores {
        _id
        wordCount
        letterCount
        scoreAuthor
        createdAt
      }
    }
  }
`;
