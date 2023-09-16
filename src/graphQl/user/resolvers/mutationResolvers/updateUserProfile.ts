import { prismaClient } from "../../../../clients/db";
import { GraphQlContext } from "../../../../types/graphQlContext";
import { UserDataProps } from "../../../../types/user";

export const upadteUserProfileMutation = {
  upadteUserProfile: async (
    parent: any,
    { userData }: { userData: UserDataProps },
    ctx: GraphQlContext
  ) => {
    // here we will not take the passwor of the user so user cannot update the password from here
    const { email, firstName, lastName, profileImageUrl } = userData;
    try {
      const user = await ctx.user;
      // checking if user if present in the ctx
      if (!user) return "you are not athourized";

      const userId = user.id;

      await prismaClient.user.update({
        where: { id: userId },
        data: {
          email: email,
          firstName: firstName,
          lastName: lastName,
          profileImageUrl: profileImageUrl,
        },
      });

      return "user profile updated";
    } catch (error: any) {
      return error.message;
    }
  },
};
