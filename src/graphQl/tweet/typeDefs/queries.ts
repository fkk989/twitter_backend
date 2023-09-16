export const queries = `#graphql
  getTweets:[Tweet]
  getTweetsById(userID:ID!):TweetObject
  getTweetsReplies(postId:ID!):TweetObject
`;
