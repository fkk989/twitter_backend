"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tweet = void 0;
var type_1 = require("./typeDefs/type");
var mutation_1 = require("./typeDefs/mutation");
var resolver_1 = require("./resolvers/resolver");
var queries_1 = require("./typeDefs/queries");
exports.tweet = {
    type: type_1.type,
    mutation: mutation_1.mutation,
    resolvers: resolver_1.resolvers,
    queries: queries_1.queries,
};
