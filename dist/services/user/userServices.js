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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
var db_1 = require("../../clients/db");
var hashSatl_1 = __importDefault(require("../../store/hashSatl"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var UserServices = /** @class */ (function () {
    function UserServices() {
    }
    //  create
    UserServices.createUser = function (lowercaseEmail, firstName, lastName, userPasswrod, profileImageUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var Hashedsalt;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, hashSatl_1.default];
                    case 1:
                        Hashedsalt = _a.sent();
                        return [4 /*yield*/, bcrypt_1.default.hash(userPasswrod, Hashedsalt)];
                    case 2:
                        userPasswrod = _a.sent();
                        return [4 /*yield*/, db_1.prismaClient.user.create({
                                data: {
                                    email: lowercaseEmail,
                                    firstName: firstName,
                                    lastName: lastName,
                                    password: userPasswrod,
                                    profileImageUrl: profileImageUrl,
                                },
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // follow
    UserServices.followUser = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.follows.create({
                            data: {
                                follower: { connect: { id: from } },
                                following: { connect: { id: to } },
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // unfollowUser
    UserServices.unfollowUser = function (from, to) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.follows.delete({
                            where: {
                                followerId_followingId: { followerId: from, followingId: to },
                            },
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // get followers
    UserServices.getFollowers = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var followsTalbe, followerArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.follows.findMany({
                            where: { following: { id: userId } },
                        })];
                    case 1:
                        followsTalbe = _a.sent();
                        followerArray = followsTalbe.map(function (elem) { return __awaiter(_this, void 0, void 0, function () {
                            var followerId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        followerId = elem.followerId;
                                        return [4 /*yield*/, db_1.prismaClient.user.findUnique({
                                                where: { id: followerId },
                                            })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [2 /*return*/, followerArray];
                }
            });
        });
    };
    // get following
    UserServices.getFollowing = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var followsTalbe, followingArray;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, db_1.prismaClient.follows.findMany({
                            where: { follower: { id: userId } },
                        })];
                    case 1:
                        followsTalbe = _a.sent();
                        followingArray = followsTalbe.map(function (elem) { return __awaiter(_this, void 0, void 0, function () {
                            var followingId;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        followingId = elem.followingId;
                                        return [4 /*yield*/, db_1.prismaClient.user.findUnique({
                                                where: { id: followingId },
                                            })];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); });
                        return [2 /*return*/, followingArray];
                }
            });
        });
    };
    return UserServices;
}());
exports.UserServices = UserServices;
