import { GraphQlContext } from "../../../../types/graphQlContext";
import { TweetServices } from "../../../../services/tweet/tweetServices";

export const getMyTweetsQuery = {
  getMyTweets: async (parent: any, {}: {}, ctx: GraphQlContext) => {
    try {
      const user = ctx.user;
      const userId = user?.id;

      if (!user || !userId) {
        return {
          tweets: null,
          message: "you are not authorized",
        };
      }

      const userTweets = TweetServices.getTweetByID(userId);
      return {
        tweets: userTweets,
        message: "successfully fetched user tweets",
      };
    } catch (e: any) {
      return {
        tweets: null,
        message: e.message,
      };
    }
  },
};
