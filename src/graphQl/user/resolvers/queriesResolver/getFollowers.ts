import { UserServices } from "../../../../services/user/userServices";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const getFollowersQuery = {
  getFollowers: async (parent: any, {}: {}, ctx: GraphQlContext) => {
    try {
      const user = ctx.user;
      const userId = user?.id;

      if (!user || !userId) return null;

      const users = await UserServices.getFollowers(userId);

      return users;
    } catch (error) {}
  },
};
