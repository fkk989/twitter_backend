export const type = `#graphql 
 input EmailProps {
    email: String!
    emailType: String!
 }


 input UpdateUserProp{
  firstName:          String
  lastName:           String
  profileImageUlr:    String
 }

 input UserProp { 
  email:              String!
  firstName:          String!
  lastName:           String!
  password:           String!
  profileImageUlr:    String
 }

 input singInProp {
   email: String!
   password:String!
 }

 type User { 
     id: ID
     email:           String
  firstName:          String
  lastName:           String
  password:           String
  profileImageUlr:    String
  tweets: [Tweet]
  postReplies:[Tweet]
  follower:[User]
  following:[User]
 }

 type UserObject {
   user: User
   message: String
 }

`;
