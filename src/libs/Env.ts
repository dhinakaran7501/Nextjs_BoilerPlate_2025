import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const Env = createEnv({
  server: {
    DATABASE_URL: z.string().optional(),
    TOKEN_SECRET: z.string().optional(),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
});
