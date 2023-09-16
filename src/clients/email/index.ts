import nodemailer from "nodemailer";
import { EmailProps } from "../../types/email";
import { prismaClient } from "../db";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "6b850f9676967a",
    pass: "7d02ac79d2d01d",
  },
});

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(emailProps: EmailProps) {
  try {
    const token = Math.floor(Math.random() * 1000 + 1000);

    const user = await prismaClient.user.findUnique({
      where: { email: emailProps.email },
    });

    /* if user will be present we will just update token 
    else we will create a new verification row in verification table */
    if (user) {
      if (emailProps.emailType === "verification") {
        await prismaClient.verification.update({
          where: { email: emailProps.email },
          data: {
            verifyEmailToken: token,
          },
        });
      } else {
        await prismaClient.verification.update({
          where: { email: emailProps.email },
          data: { forgotPasswordToken: token },
        });
      }
    } else {
      if (emailProps.emailType === "verification") {
        await prismaClient.verification.create({
          data: {
            email: emailProps.email,
            verifyEmailToken: token,
          },
        });
      } else {
        await prismaClient.verification.create({
          data: {
            email: emailProps.email,
            forgotPasswordToken: token,
          },
        });
      }
    }

    const info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: emailProps.email, // list of receivers
      subject: `${
        emailProps.emailType === "verification"
          ? "Email verification"
          : "Reset your password"
      }`,
      text: `${
        emailProps.emailType === "verification"
          ? "Verify your email"
          : "Reset you password"
      }`,
      html: `<h1> ${`${
        emailProps.emailType === "verification"
          ? "your verification token is:"
          : "Reset password token:"
      }`} ${token} </h1>`, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return true;
  } catch (e: any) {
    console.log(e.message);
    return false;
  }
}
