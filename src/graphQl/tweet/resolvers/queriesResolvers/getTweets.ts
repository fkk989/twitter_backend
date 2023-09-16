import { prismaClient } from "../../../../clients/db";
import { GraphQlContext } from "../../../../types/graphQlContext";

// this endpoint return all  the tweets present in the function
export const getTweetsQuery = {
  getTweets: async (parent: any, {}: {}, ctx: GraphQlContext) => {
    try {
      const user = ctx.user;

      if (!user) return null;

      const tweets = await prismaClient.tweet.findMany({
        orderBy: { content: "desc" },
      });

      return tweets;
    } catch (error: any) {
      return null;
    }
  },
};
