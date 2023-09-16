import { prismaClient } from "../../../../clients/db";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const deleteTweetMutation = {
  deleteTweet: async (
    parent: any,
    { tweetId }: { tweetId: string },
    ctx: GraphQlContext
  ) => {
    try {
      const user = ctx.user;
      if (!user) return "you are not authorized";

      await prismaClient.tweet.delete({
        where: { id: tweetId },
      });

      return "Tweet deleted successfully";
    } catch (e: any) {
      return e.message;
    }
  },
};
