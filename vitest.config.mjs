import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
  },
  plugins: [tsConfigPaths()],
});
