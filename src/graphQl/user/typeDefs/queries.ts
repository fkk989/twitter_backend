export const queries = `#graphql
   signIn(userData:singInProp!): UserObject
   verifiOrResetPasswrod(emailProps:EmailProps!):String
   getMyTweets:TweetObject
   getFollowers:[User]
   getFollowing:[User]
   logout: String
`;
