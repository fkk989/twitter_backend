import { prismaClient } from "../../../../clients/db";
import { EmailProps } from "../../../../types/email";
import { GraphQlContext } from "../../../../types/graphQlContext";
export const deleteTokenQuery = {
  deleteToken: async (
    parent: any,
    { emailProps }: { emailProps: EmailProps },
    ctx: GraphQlContext
  ) => {
    try {
      //  if user is verifing email
      if (emailProps.emailType === "verification") {
        await prismaClient.verification.update({
          where: { email: emailProps.email },
          data: {
            verifyEmailToken: null,
          },
        });
        return "verification token expired";
      }

      //else if user is resetting password
      await prismaClient.verification.update({
        where: { email: emailProps.email },
        data: { forgotPasswordToken: null },
      });
      return "resetPassword token expired";
    } catch (error: any) {
      return error.message;
    }
  },
};
