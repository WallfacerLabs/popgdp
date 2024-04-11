import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    DRIZZLE_DATABASE_URL: z.string().url(),

    AUTH0_SECRET: z.string().min(1),
    AUTH0_BASE_URL: z.string().url(),
    AUTH0_ISSUER_BASE_URL: z.string().url(),
    AUTH0_CLIENT_ID: z.string().min(1),
    AUTH0_CLIENT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_SKIP_STAGE_CHECK: z
      .string()
      .default("false")
      .transform((value) => value === "true"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SKIP_STAGE_CHECK: process.env.NEXT_PUBLIC_SKIP_STAGE_CHECK,
  },
});
