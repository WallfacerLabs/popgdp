import path from "node:path";
import { config } from "dotenv";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    env: config({ path: ".env.test" }).parsed,
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    coverage: {
      provider: "v8",
      include: ["**/*Action.ts", "**/actionPermissions.ts"],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: "next/dist/compiled/react/cjs/react.development.js",
    },
  },
});
