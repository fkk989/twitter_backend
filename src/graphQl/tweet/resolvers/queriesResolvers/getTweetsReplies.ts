import { TweetServices } from "../../../../services/tweet/tweetServices";
import { GraphQlContext } from "../../../../types/graphQlContext";
import { TweetObj } from "../../../../types/tweet";

export const getTweetsRepliesQuery = {
  getTweetsReplies: async (
    parent: any,
    { postId }: { postId: string },
    ctx: GraphQlContext
  ) => {
    try {
      const user = ctx.user;
      if (!user)
        return {
          tweets: null,
          message: "you are not authorized",
        };

      const tweetsReplies = await TweetServices.getTweetReplies(postId);

      return {
        tweets: tweetsReplies,
        message: "Fetched tweets replies successfully",
      };
    } catch (e: any) {
      return {
        tweets: null,
        message: e.message,
      };
    }
  },
};
