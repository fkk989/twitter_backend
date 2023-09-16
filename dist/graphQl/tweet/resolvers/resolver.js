"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
var getTweets_1 = require("./queriesResolvers/getTweets");
var getAuthor_1 = require("./queriesResolvers/getAuthor");
var getTweetsById_1 = require("./queriesResolvers/getTweetsById");
var getTweetsReplies_1 = require("./queriesResolvers/getTweetsReplies");
// mutation
var createTweet_1 = require("./mutationResolvers/createTweet");
var postReply_1 = require("./mutationResolvers/postReply");
var deleteTweet_1 = require("./mutationResolvers/deleteTweet");
var deleteReply_1 = require("./mutationResolvers/deleteReply");
exports.resolvers = {
    Query: __assign(__assign(__assign({}, getTweets_1.getTweetsQuery), getTweetsById_1.gettTweetsByIdQuery), getTweetsReplies_1.getTweetsRepliesQuery),
    Mutation: __assign(__assign(__assign(__assign({}, createTweet_1.createTweetMutation), deleteTweet_1.deleteTweetMutation), postReply_1.postReplyMutation), deleteReply_1.deletePostReplyMutation),
    Tweet: __assign({}, getAuthor_1.getAuthorQuery),
};
