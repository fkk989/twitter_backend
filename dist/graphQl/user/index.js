"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
var queries_1 = require("./typeDefs/queries");
var type_1 = require("./typeDefs/type");
var resolver_1 = require("./resolvers/resolver");
var mutation_1 = require("./typeDefs/mutation");
exports.user = {
    queries: queries_1.queries,
    type: type_1.type,
    mutation: mutation_1.mutation,
    resolvers: resolver_1.resolvers,
};
