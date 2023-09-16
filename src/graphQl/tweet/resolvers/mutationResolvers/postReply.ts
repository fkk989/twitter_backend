import { TweetServices } from "../../../../services/tweet/tweetServices";
import { GraphQlContext } from "../../../../types/graphQlContext";
import { PostReplyProps } from "../../../../types/tweet";

export const postReplyMutation = {
  postReply: async (
    parent: any,
    { postReplyArgs }: { postReplyArgs: PostReplyProps },
    ctx: GraphQlContext
  ) => {
    try {
      const { postId, content, imageUrl, videoUrl } = postReplyArgs;
      const user = ctx.user;
      const userId = user?.id;

      //   tweet object
      const tweet = {
        content,
        imageUrl,
        videoUrl,
      };

      if (!user || !userId) return "you are not authorized";

      const createdTweet = await TweetServices.createTweet(tweet, userId);

      const createdPostId = createdTweet.id;

      //   to represent to whome we are replying to
      await TweetServices.postReply(createdPostId, postId);

      return "successfully replied";
    } catch (e: any) {
      return e.message;
    }
  },
};
