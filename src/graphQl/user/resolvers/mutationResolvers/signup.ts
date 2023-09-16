import { prismaClient } from "../../../../clients/db";
import { GraphQlContext } from "../../../../types/graphQlContext";
import JwtService from "../../../../services/jw";
import { UserDataProps } from "../../../../types/user";
import { UserServices } from "../../../../services/user/userServices";

const JWT_SECRET = process.env.JWT_SECRET;

export const signupMutation = {
  signup: async (
    parent: any,
    { userData }: { userData: UserDataProps },
    ctx: GraphQlContext
  ) => {
    try {
      const { email, firstName, lastName, password, profileImageUrl } =
        userData;
      // making email smallcase
      const lowercaseEmail = email.toLocaleLowerCase();

      const user = await prismaClient.user.findUnique({
        where: { email: lowercaseEmail },
      });

      // if user already already exits we will
      if (user) {
        return {
          user: null,
          message: "user already exists",
        };
      }

      // creating user if user not present
      await UserServices.createUser(
        lowercaseEmail,
        firstName,
        lastName,
        password,
        profileImageUrl
      );

      const userInDb = await prismaClient.user.findUnique({
        where: { email: lowercaseEmail },
      });

      if (userInDb) {
        const token = await JwtService.generateTokenForUser(userInDb);
        // setting cookie
        const res = ctx.res;
        res?.cookie("_Twitter_Token", token);
      }

      return {
        user: userInDb,
        message: "user created successfully",
      };
    } catch (error: any) {
      return {
        user: null,
        message: error.message,
      };
    }
  },
};
