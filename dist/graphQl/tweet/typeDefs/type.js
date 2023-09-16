"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.type = void 0;
exports.type = "#graphql\ninput TweetProps {\n  content:  String\n  imageUrl: String\n  videoUrl: String\n}\n type Tweet {\n  id:       ID!\n  content:  String!\n  imageUrl: String\n  videoUrl: String\n  author:   User\n }\n type ATweetObject{\n  tweet:Tweet\n  message: String\n }\n type TweetObject{\n  tweets: [Tweet] \n  message: String\n }\n input postReplyProps {\n  postId:  String\n  content:  String\n  imageUrl: String\n  videoUrl: String\n }\n";
