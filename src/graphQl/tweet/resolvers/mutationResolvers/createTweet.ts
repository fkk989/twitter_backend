import { prismaClient } from "../../../../clients/db";
import { TweetServices } from "../../../../services/tweet/tweetServices";
import { GraphQlContext } from "../../../../types/graphQlContext";
import { TweetProps } from "../../../../types/tweet";

export const createTweetMutation = {
  createTweet: async (
    parent: any,
    { tweet }: { tweet: TweetProps },
    ctx: GraphQlContext
  ) => {
    try {
      const { content, imageUrl, videoUrl } = tweet;
      const user = ctx.user;
      const userId = user?.id;
      const userEmail = user?.email;

      if (!user || !userId) return "you are not authorized";

      const userInDb = await prismaClient.user.findUnique({
        where: { email: userEmail },
      });

      if (!userInDb) return "user not found with this email";

      await TweetServices.createTweet(tweet, userId);

      return "Tweet created";
    } catch (e: any) {
      return e.message;
    }
  },
};
