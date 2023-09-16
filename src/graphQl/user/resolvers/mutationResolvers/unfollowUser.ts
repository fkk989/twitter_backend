import { UserServices } from "../../../../services/user/userServices";
import { GraphQlContext } from "../../../../types/graphQlContext";

export const unfollowUserMutation = {
  unfollowUser: async (
    parent: any,
    { unfollowUserId }: { unfollowUserId: string },
    ctx: GraphQlContext
  ) => {
    try {
      const user = ctx.user;
      const userId = user?.id;

      if (!user || !userId) return "you are not authorized";

      await UserServices.unfollowUser(userId, unfollowUserId);
      return "unfollowed successfully";
    } catch (e: any) {
      return e.message;
    }
  },
};
