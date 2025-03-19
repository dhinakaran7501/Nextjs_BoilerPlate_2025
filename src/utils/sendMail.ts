import type { Transporter } from "nodemailer";
import nodemailer from "nodemailer";

import { Env } from "@/libs/Env";

export type EmailOption = {
  email: string;
  subject: string;
  message: string;
  attachments?: Array<{
    filename: string;
    path: string;
  }>;
};

export const sendEmail = async (option: EmailOption): Promise<void> => {
  try {
    const transporter: Transporter = nodemailer.createTransport({
      // host: Env.MAIL_HOST,
      port: 587,
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: Env.NODEMAILER_MAIL,
        pass: Env.NODEMAILER_PASS,
      },
    });

    const mailOption = {
      from: Env.NODEMAILER_MAIL,
      to: option.email,
      subject: option.subject,
      html: option.message,
      attachments: option.attachments,
    };

    await transporter.sendMail(mailOption);
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
};

//usage methods

// const mailOption = {
//     email: result.email,
//     subject: `Login Details`,
//     message: renderFile(TEMPLATE.FORGET_PASSWORD, {
//       name: result.name,
//       email: result.email,
//       password,
//     }),
//   };

// try {
//     await sendEmail(mailOption);
//   } catch (mailError: any) {
//     logger.error(`Failed to send email: ${mailError.message}`);
//     throw new Error(`Failed to send email: ${mailError.message}`);
//   }
