"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queries = void 0;
exports.queries = "#graphql\n  getTweets:[Tweet]\n  getTweetsById(userID:ID!):TweetObject\n  getTweetsReplies(postId:ID!):TweetObject\n";
