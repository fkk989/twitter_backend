import { User } from "@prisma/client";
import { prismaClient } from "../../../../clients/db";
import { GraphQlContext } from "../../../../types/graphQlContext";

//
export const getTweetsOfAUserQuery = {
  tweets: async (
    parent: User,

    ctx: GraphQlContext
  ) => {
    try {
      // when user click on tweets it will return all the tweets of that user
      const tweets = await prismaClient.tweet.findMany({
        where: { author: { id: parent.id } },
        orderBy: { createdAt: "desc" },
      });

      return tweets;
    } catch (error) {
      return error;
    }
  },
};
