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
// queries
var verifyOrResetPassword_1 = require("./queriesResolver/verifyOrResetPassword");
var signin_1 = require("./queriesResolver/signin");
var logout_1 = require("./queriesResolver/logout");
var getTweetsOfUsers_1 = require("./queriesResolver/getTweetsOfUsers");
var getMyTweets_1 = require("./queriesResolver/getMyTweets");
var getFollowers_1 = require("./queriesResolver/getFollowers");
var getFollowing_1 = require("./queriesResolver/getFollowing");
// mutations
var signup_1 = require("./mutationResolvers/signup");
var deleteToken_1 = require("./mutationResolvers/deleteToken");
var updateUserProfile_1 = require("./mutationResolvers/updateUserProfile");
var followUser_1 = require("./mutationResolvers/followUser");
var unfollowUser_1 = require("./mutationResolvers/unfollowUser");
exports.resolvers = {
    Query: __assign(__assign(__assign(__assign(__assign(__assign({}, verifyOrResetPassword_1.verifiOrResetPasswrodQuery), signin_1.signInQuery), logout_1.logoutQuery), getMyTweets_1.getMyTweetsQuery), getFollowers_1.getFollowersQuery), getFollowing_1.getFollowingQuery),
    Mutation: __assign(__assign(__assign(__assign(__assign({}, signup_1.signupMutation), deleteToken_1.deleteTokenQuery), updateUserProfile_1.upadteUserProfileMutation), followUser_1.followUserQuery), unfollowUser_1.unfollowUserMutation),
    User: __assign({}, getTweetsOfUsers_1.getTweetsOfAUserQuery),
};
