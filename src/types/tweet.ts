import { Tweet } from "@prisma/client";

export type TweetProps = {
  content: string;
  imageUrl?: string;
  videoUrl?: string;
};

export type TweetObj = {
  tweets: Tweet | [];
  message: string;
};

export type PostReplyProps = {
  postId: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
};
