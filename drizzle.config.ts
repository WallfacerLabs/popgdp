import { config } from "dotenv";
import type { Config } from "drizzle-kit";

import { env } from "@/config/env";

config();

export default {
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DRIZZLE_DATABASE_URL,
  },
  breakpoints: false,
} satisfies Config;
