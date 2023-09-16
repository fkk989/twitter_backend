export const type = `#graphql
input TweetProps {
  content:  String
  imageUrl: String
  videoUrl: String
}
 type Tweet {
  id:       ID!
  content:  String!
  imageUrl: String
  videoUrl: String
  author:   User
 }
 type ATweetObject{
  tweet:Tweet
  message: String
 }
 type TweetObject{
  tweets: [Tweet] 
  message: String
 }
 input postReplyProps {
  postId:  String
  content:  String
  imageUrl: String
  videoUrl: String
 }
`;
