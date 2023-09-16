import { getTweetsQuery } from "./queriesResolvers/getTweets";
import { getAuthorQuery } from "./queriesResolvers/getAuthor";
import { gettTweetsByIdQuery } from "./queriesResolvers/getTweetsById";
import { getTweetsRepliesQuery } from "./queriesResolvers/getTweetsReplies";
// mutation
import { createTweetMutation } from "./mutationResolvers/createTweet";
import { postReplyMutation } from "./mutationResolvers/postReply";
import { deleteTweetMutation } from "./mutationResolvers/deleteTweet";
import { deletePostReplyMutation } from "./mutationResolvers/deleteReply";

export const resolvers = {
  Query: {
    ...getTweetsQuery,
    ...gettTweetsByIdQuery,
    ...getTweetsRepliesQuery,
  },
  Mutation: {
    ...createTweetMutation,
    ...deleteTweetMutation,
    ...postReplyMutation,
    ...deletePostReplyMutation,
  },
  Tweet: {
    ...getAuthorQuery,
  },
};
