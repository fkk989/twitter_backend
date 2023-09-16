import { prismaClient } from "../../../../clients/db";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { GraphQlContext, JwtUser } from "../../../../types/graphQlContext";
import JWT from "jsonwebtoken";
import JwtService from "../../../../services/jw";
import { UserDataProps, singInProp } from "../../../../types/user";
import salt from "../../../../store/hashSatl";
import { user } from "../..";

const JWT_SECRET = process.env.JWT_SECRET;
// console.log(JWT_SECRET);

export const signInQuery = {
  signIn: async (
    parent: any,
    { userData }: { userData: singInProp },
    ctx: GraphQlContext
  ) => {
    try {
      const { email, password } = userData;

      const lowercaseEmail = email.toLocaleLowerCase();

      const userInDb = await prismaClient.user.findUnique({
        where: { email: lowercaseEmail },
      });

      if (!userInDb)
        return {
          user: null,
          message: "user not found please signin",
        };

      //   checking if passwor is correct
      const verifyingUserPassword = await bcrypt.compare(
        password,
        userInDb.password
      );

      //   checking if user password correct
      if (!verifyingUserPassword) {
        return {
          user: null,
          message: "Invalid credential",
        };
      }

      // setting cookie and returning if user passwor is correct
      const token = await JwtService.generateTokenForUser(userInDb);
      const res = ctx.res;
      res?.cookie("_Twitter_Token", token);

      // removeing password from user
      userInDb.password = "undefined";

      return {
        user: userInDb,
        message: "Loged in successfully",
      };

      //   catching the error
    } catch (e: any) {
      return {
        user: null,
        message: e.message,
      };
    }
  },
};
