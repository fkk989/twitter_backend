import { prismaClient } from "../../../../clients/db";
import { UserServices } from "../../../../services/user/userServices";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const followUserQuery = {
  followUser: async (
    parent: any,
    { to }: { to: string },
    ctx: GraphQlContext
  ) => {
    try {
      const user = ctx.user;
      const userId = user?.id;

      if (!user || !userId) return "you are not authorized";
      if (userId === to) return "you cannot follow your self";

      await UserServices.followUser(userId, to);
      const followedUser = await prismaClient.user.findUnique({
        where: { id: to },
      });

      return `followed ${followedUser?.firstName} ${followedUser?.lastName}`;
    } catch (e: any) {
      return e.message;
    }
  },
};
