import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";

// Needed for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ];

  // (Optional) Replit plugin
  if (process.env.REPL_ID) {
    const cartographerModule = await import("@replit/vite-plugin-cartographer").catch(() => null);
    if (cartographerModule) {
      plugins.push(cartographerModule.cartographer());
    }
  }

  return {
    // 1) Tell Vite your source code is in "client/"
    root: path.resolve(__dirname, "client"),

    // 2) Put the final build in "<repo-root>/dist"
    build: {
      outDir: path.resolve(__dirname, "dist"), // dist at repo root
      emptyOutDir: true,
    },

    // 3) Set up your aliases as needed
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },

    plugins,
  };
});
