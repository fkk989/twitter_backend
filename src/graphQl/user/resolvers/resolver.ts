// queries
import { verifiOrResetPasswrodQuery } from "./queriesResolver/verifyOrResetPassword";
import { signInQuery } from "./queriesResolver/signin";
import { logoutQuery } from "./queriesResolver/logout";
import { getTweetsOfAUserQuery } from "./queriesResolver/getTweetsOfUsers";
import { getMyTweetsQuery } from "./queriesResolver/getMyTweets";
import { getFollowersQuery } from "./queriesResolver/getFollowers";
import { getFollowingQuery } from "./queriesResolver/getFollowing";
// mutations
import { signupMutation } from "./mutationResolvers/signup";
import { deleteTokenQuery } from "./mutationResolvers/deleteToken";
import { upadteUserProfileMutation } from "./mutationResolvers/updateUserProfile";
import { followUserQuery } from "./mutationResolvers/followUser";
import { unfollowUserMutation } from "./mutationResolvers/unfollowUser";

export const resolvers = {
  Query: {
    ...verifiOrResetPasswrodQuery,
    ...signInQuery,
    ...logoutQuery,
    ...getMyTweetsQuery,
    ...getFollowersQuery,
    ...getFollowingQuery,
  },
  Mutation: {
    ...signupMutation,
    ...deleteTokenQuery,
    ...upadteUserProfileMutation,
    ...followUserQuery,
    ...unfollowUserMutation,
  },
  User: {
    ...getTweetsOfAUserQuery,
  },
};
