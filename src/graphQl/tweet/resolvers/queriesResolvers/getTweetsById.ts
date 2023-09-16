import { TweetServices } from "../../../../services/tweet/tweetServices";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const gettTweetsByIdQuery = {
  getTweetsById: async (
    parent: any,
    { userID }: { userID: string },
    ctx: GraphQlContext
  ) => {
    try {
      const user = ctx.user;
      if (!user)
        return {
          tweets: null,
          message: "you are not authorized",
        };

      const tweets = await TweetServices.getTweetByID(userID);

      return {
        tweets: tweets,
        message: "successfully fetched the tweets",
      };
    } catch (e: any) {
      return e.message;
    }
  },
};
