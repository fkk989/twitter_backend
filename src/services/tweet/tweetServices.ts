import { Tweet } from "@prisma/client";
import { prismaClient } from "../../clients/db";
import { TweetProps } from "../../types/tweet";

export class TweetServices {
  public static async createTweet(tweet: TweetProps, userId: string) {
    const { content, imageUrl, videoUrl } = tweet;
    const createdTweet = await prismaClient.tweet.create({
      data: {
        content,
        imageUrl,
        videoUrl,
        author: { connect: { id: userId } },
      },
    });

    return createdTweet;
  }

  public static async getTweetByID(authorID: string) {
    const tweets = await prismaClient.tweet.findMany({
      where: { author: { id: authorID } },
    });
    return tweets;
  }

  public static async postReply(postReplyId: string, postId: string) {
    await prismaClient.status.create({
      data: {
        reply: { connect: { id: postReplyId } },
        post: { connect: { id: postId } },
      },
    });
  }

  // getTweetsReplies
  public static async getTweetReplies(postId: string) {
    const postRepliesId = await prismaClient.status.findMany({
      where: { post: { id: postId } },
    });

    const postReplies = postRepliesId.map((elem) => {
      return prismaClient.tweet.findUnique({
        where: { id: elem.replyId },
      });
    });

    return postReplies;
  }

  // deleteTweet
  public static async deleteTweet(TweetId: string) {
    await prismaClient.tweet.delete({
      where: { id: TweetId },
    });
  }
  // deletePostReply
  public static async deletePostReply(
    replyId: string,
    postId: string,
    userId: string
  ) {
    const deletedReplyId = await prismaClient.status.delete({
      where: { postId_replyId: { postId, replyId } },
    });

    const deletedReply = await prismaClient.tweet.delete({
      where: { author: { id: userId }, id: deletedReplyId.replyId },
    });

    return deletedReply;
  }
}
