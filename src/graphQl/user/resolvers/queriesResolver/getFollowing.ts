import { UserServices } from "../../../../services/user/userServices";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const getFollowingQuery = {
  getFollowing: async (parent: any, {}: {}, ctx: GraphQlContext) => {
    try {
      const user = ctx.user;
      const userId = user?.id;

      if (!user || !userId) return null;

      const users = await UserServices.getFollowing(userId);

      return users;
    } catch (error) {}
  },
};
