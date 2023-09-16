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
exports.initServer = void 0;
var express_1 = __importDefault(require("express"));
var server_1 = require("@apollo/server");
var express4_1 = require("@apollo/server/express4");
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var jw_1 = __importDefault(require("../services/jw"));
// all typeDefs
var user_1 = require("../graphQl/user");
var tweet_1 = require("../graphQl/tweet");
var initServer = function () { return __awaiter(void 0, void 0, void 0, function () {
    var app, server;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                app = (0, express_1.default)();
                app.use((0, cors_1.default)(), body_parser_1.default.json(), (0, cookie_parser_1.default)());
                server = new server_1.ApolloServer({
                    typeDefs: "#graphql\n       ".concat(user_1.user.type, "\n       ").concat(tweet_1.tweet.type, "\n        type Query{\n           ").concat(user_1.user.queries, "\n           ").concat(tweet_1.tweet.queries, "\n        }\n        type  Mutation {\n          ").concat(user_1.user.mutation, "\n          ").concat(tweet_1.tweet.mutation, "\n        }\n        "),
                    resolvers: {
                        Query: __assign(__assign({}, user_1.user.resolvers.Query), tweet_1.tweet.resolvers.Query),
                        Mutation: __assign(__assign({}, user_1.user.resolvers.Mutation), tweet_1.tweet.resolvers.Mutation),
                        User: __assign({}, user_1.user.resolvers.User),
                        Tweet: __assign({}, tweet_1.tweet.resolvers.Tweet),
                    },
                });
                //  starting server
                return [4 /*yield*/, server.start()];
            case 1:
                //  starting server
                _a.sent();
                app.use("/graphql", (0, express4_1.expressMiddleware)(server, {
                    context: function (_a) {
                        var req = _a.req, res = _a.res;
                        return __awaiter(void 0, void 0, void 0, function () {
                            var _Twitter_Token, token, _b;
                            var _c;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        _Twitter_Token = (req.cookies && req.cookies)._Twitter_Token;
                                        token = _Twitter_Token ? _Twitter_Token : undefined;
                                        _c = {};
                                        if (!token) return [3 /*break*/, 2];
                                        return [4 /*yield*/, jw_1.default.decodeUserToken(token)];
                                    case 1:
                                        _b = _d.sent();
                                        return [3 /*break*/, 3];
                                    case 2:
                                        _b = undefined;
                                        _d.label = 3;
                                    case 3: return [2 /*return*/, (_c.user = _b,
                                            _c.req = req,
                                            _c.res = res,
                                            _c)];
                                }
                            });
                        });
                    },
                }));
                return [2 /*return*/, app];
        }
    });
}); };
exports.initServer = initServer;
