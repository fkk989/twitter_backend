"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postReply = void 0;
var types_1 = require("./typeDefs/types");
var mutations_1 = require("./typeDefs/mutations");
var resolvers_1 = require("./resolvers/resolvers");
exports.postReply = {
    types: types_1.types,
    mutation: mutations_1.mutation,
    resolvers: resolvers_1.resolvers,
};
