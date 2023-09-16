import { queries } from "./typeDefs/queries";
import { type } from "./typeDefs/type";
import { resolvers } from "./resolvers/resolver";
import { mutation } from "./typeDefs/mutation";

export const user = {
  queries,
  type,
  mutation,
  resolvers,
};
