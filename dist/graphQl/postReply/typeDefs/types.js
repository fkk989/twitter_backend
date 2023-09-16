"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.types = void 0;
exports.types = "#graphql\n\ninput PostReplyProps{\n    content:  String\n  imageUrl: String\n  videoUrl: String\n}\n\ntype PostReply{\n    id:     String  \n  content:  String\n  imageUrl: String\n  videoUrl: String\n\n  tweet: Tweet  \n}\n\n";
