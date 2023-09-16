import { sendEmail } from "../../../../clients/email";
import { EmailProps } from "../../../../types/email";
import { GraphQlContext } from "../../../../types/graphQlContext";
export const verifiOrResetPasswrodQuery = {
  verifiOrResetPasswrod: async (
    parent: any,
    { emailProps }: { emailProps: EmailProps },
    ctx: GraphQlContext
  ) => {
    try {
      // getting user from the context

      // if user is triying to verify
      if (emailProps.emailType === "verification") {
        const mail = await sendEmail({
          emailType: "verification",
          email: emailProps.email,
        }).catch((e) => console.log(e));

        return "verification token sent to email";
      }

      // if user is
      const email = await sendEmail({
        emailType: "resetPassword",
        email: emailProps.email,
      }).catch((e) => console.log(e));
      return "Reset passwrod token sent to email ";
    } catch (error: any) {
      return error.message;
    }
  },
};
