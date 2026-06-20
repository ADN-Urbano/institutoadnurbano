import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Alias replicados desde tsconfig.json (paths "@/*" y "@payload-config").
// Se definen a mano para no añadir dependencias extra al runner.
export default defineConfig({
  resolve: {
    alias: {
      "@payload-config": fileURLToPath(new URL("./src/payload.config.ts", import.meta.url)),
      "@/": fileURLToPath(new URL("./src/", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
