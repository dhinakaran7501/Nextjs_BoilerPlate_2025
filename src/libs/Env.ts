import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    TOKEN_SECRET: z.string().optional(),
    NODEMAILER_MAIL: z.string().optional(),
    NODEMAILER_PASS: z.string().optional(),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    NODEMAILER_MAIL: process.env.NODEMAILER_MAIL,
    NODEMAILER_PASS: process.env.NODEMAILER_PASS,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});
