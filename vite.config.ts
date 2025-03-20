import { defineConfig, ViteDevServer, PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import history from "connect-history-api-fallback";

// Needed for ESM modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create a custom plugin to add history fallback middleware
function historyFallbackPlugin(): PluginOption {
  return {
    name: "history-fallback-plugin",
    configureServer(server: ViteDevServer) {
      // Cast to any to bypass the type mismatch issue
      server.middlewares.use(history() as any);
    },
  };
}

export default defineConfig({
  // 1) Source code is in "client/"
  root: path.resolve(__dirname, "client"),

  // 2) Build output is in "<repo-root>/dist"
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

  // 4) Add plugins
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    // Add the custom history fallback plugin
    historyFallbackPlugin(),
  ],
});
