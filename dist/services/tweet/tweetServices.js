"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetServices = void 0;
var db_1 = require("../../clients/db");
var TweetServices = /** @class */ (function () {
    function TweetServices() {
    }
    TweetServices.createTweet = function (tweet, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var content, imageUrl, videoUrl, createdTweet;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        content = tweet.content, imageUrl = tweet.imageUrl, videoUrl = tweet.videoUrl;
                        return [4 /*yield*/, db_1.prismaClient.tweet.create({
                                data: {
                                    content: content,
                                    imageUrl: imageUrl,
                                    videoUrl: videoUrl,
                                    author: { connect: { id: userId } },
                                },
                            })];
                    case 1:
                        createdTweet = _a.sent();
                        return [2 /*return*/, createdTweet];
                }
            });
        });
    };
    TweetServices.getTweetByID = function (authorID) {
        return __awaiter(this, void 0, void 0, function () {
            var tweets;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.tweet.findMany({
                            where: { author: { id: authorID } },
                        })];
                    case 1:
                        tweets = _a.sent();
                        return [2 /*return*/, tweets];
                }
            });
        });
    };
    TweetServices.postReply = function (postReplyId, postId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.status.create({
                            data: {
                                reply: { connect: { id: postReplyId } },
                                post: { connect: { id: postId } },
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // getTweetsReplies
    TweetServices.getTweetReplies = function (postId) {
        return __awaiter(this, void 0, void 0, function () {
            var postRepliesId, postReplies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.status.findMany({
                            where: { post: { id: postId } },
                        })];
                    case 1:
                        postRepliesId = _a.sent();
                        postReplies = postRepliesId.map(function (elem) {
                            return db_1.prismaClient.tweet.findUnique({
                                where: { id: elem.replyId },
                            });
                        });
                        return [2 /*return*/, postReplies];
                }
            });
        });
    };
    // deleteTweet
    TweetServices.deleteTweet = function (TweetId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.tweet.delete({
                            where: { id: TweetId },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // deletePostReply
    TweetServices.deletePostReply = function (replyId, postId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var deletedReplyId, deletedReply;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.status.delete({
                            where: { postId_replyId: { postId: postId, replyId: replyId } },
                        })];
                    case 1:
                        deletedReplyId = _a.sent();
                        return [4 /*yield*/, db_1.prismaClient.tweet.delete({
                                where: { author: { id: userId }, id: deletedReplyId.replyId },
                            })];
                    case 2:
                        deletedReply = _a.sent();
                        return [2 /*return*/, deletedReply];
                }
            });
        });
    };
    return TweetServices;
}());
exports.TweetServices = TweetServices;
