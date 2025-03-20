import { defineConfig, ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import history from "connect-history-api-fallback";
import type { NextHandleFunction } from "connect"; // ✅ Import the Connect middleware type

// Needed for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  // 1) Tell Vite your source code is in "client/"
  root: path.resolve(__dirname, "client"),

  // 2) Put the final build in "<repo-root>/dist"
  build: {
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
  },

  // 3) Set up your aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
    },
  },

  // 4) Plugins
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ],

  // 5) SPA fallback setup
  server: {
    middlewareMode: true, // or 'ssr'
    configureServer: (server: ViteDevServer) => {
      // Cast to NextHandleFunction so TypeScript knows it's valid middleware
      server.middlewares.use(history() as NextHandleFunction);
    },
  },
});
