import { type } from "./typeDefs/type";
import { mutation } from "./typeDefs/mutation";
import { resolvers } from "./resolvers/resolver";
import { queries } from "./typeDefs/queries";

export const tweet = {
  type,
  mutation,
  resolvers,
  queries,
};
