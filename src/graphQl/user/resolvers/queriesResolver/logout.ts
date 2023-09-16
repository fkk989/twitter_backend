import { GraphQlContext } from "../../../../types/graphQlContext";

export const logoutQuery = {
  logout: async (parent: any, {}: {}, ctx: GraphQlContext) => {
    try {
      const res = await ctx.res;
      //clearing the cookie
      res?.clearCookie("_Twitter_Token");
      return "logout successfully";
    } catch (e: any) {
      return e.message;
    }
  },
};
