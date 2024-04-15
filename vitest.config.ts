import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["**/*.test.ts", "**/*.test.tsx"],
    setupFiles: ["dotenv/config"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      react: 'next/dist/compiled/react/cjs/react.development.js',
      "@auth0/nextjs-auth0": path.resolve(__dirname, './tests/helpers/getSession.ts')
    },
  },
});
