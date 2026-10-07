// This wrapper wires the required React, TanStack Start, Tailwind, and Nitro plugins.
// Removing it requires replacing that build integration, not just removing editor tagging.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: { preset: "node-server" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
});
