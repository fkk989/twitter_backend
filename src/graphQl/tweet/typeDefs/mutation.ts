export const mutation = `#graphql 
    createTweet(tweet:TweetProps!): TweetObject
    updateTweet(tweet:TweetProps!): TweetObject
    postReply(postReplyArgs:postReplyProps!):String
    deleteTweet(tweetId:String!): TweetObject
    deletePostReply(replyId: String!, postId: String!):ATweetObject
`;
