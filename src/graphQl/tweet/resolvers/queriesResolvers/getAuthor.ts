import { Tweet } from "@prisma/client";
import { prismaClient } from "../../../../clients/db";
import { GraphQlContext } from "../../../../types/graphQlContext";

// this return User when somebody query User inside Tweet
export const getAuthorQuery = {
  author: async (parent: Tweet, {}: {}, ctx: GraphQlContext) => {
    try {
      const author = await prismaClient.user.findUnique({
        where: {
          id: parent.authorId,
        },
      });
      return author;
    } catch (e: any) {
      return e.message;
    }
  },
};
