"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
exports.mutation = "#graphql \n    createTweet(tweet:TweetProps!): TweetObject\n    updateTweet(tweet:TweetProps!): TweetObject\n    postReply(postReplyArgs:postReplyProps!):String\n    deleteTweet(tweetId:String!): TweetObject\n    deletePostReply(replyId: String!, postId: String!):ATweetObject\n";
