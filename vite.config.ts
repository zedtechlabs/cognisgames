import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import history from "connect-history-api-fallback";

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
    // 1) Source code in "client/"
    root: path.resolve(__dirname, "client"),

    // 2) Build output in "<repo-root>/dist"
    build: {
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },

    // 3) Aliases
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },

    // 4) Plugins
    plugins,

    // 5) Enable custom middleware for SPA fallback
    server: {
      middlewareMode: true, // or 'ssr'
      configureServer: (server) => {
        // Use connect-history-api-fallback to handle /games, /anything routes
        server.middlewares.use(
          history({
            // Options if needed, e.g.:
            // verbose: true
          })
        );
      },
    },
  };
});
