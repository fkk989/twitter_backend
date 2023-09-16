export const mutation = `#graphql
   signup(userData:UserProp!):UserObject
   deleteToken(emailProps:EmailProps!):String
   upadteUserProfile(userData:UpdateUserProp!):String
   followUser(to:ID!): String
   unfollowUser(unfollowUserId:ID!): String
`;
