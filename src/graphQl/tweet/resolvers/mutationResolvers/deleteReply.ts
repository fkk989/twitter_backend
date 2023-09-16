import { TweetServices } from "../../../../services/tweet/tweetServices";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const deletePostReplyMutation = {
  deletePostReply: async (
    parent: any,
    { replyId, postId }: { replyId: string; postId: string },
    ctx: GraphQlContext
  ) => {
    try {
      const user = ctx.user;
      const userId = user?.id;
      if (!user || !userId)
        return {
          tweet: null,
          message: "you are not authorized",
        };

      const deletedReply = await TweetServices.deletePostReply(
        replyId,
        postId,
        userId
      );
      return {
        tweet: deletedReply,
        message: "successfully deleted your reply",
      };
    } catch (e: any) {
      return {
        tweet: null,
        message: e.message,
      };
    }
  },
};
