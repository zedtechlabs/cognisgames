import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(async () => {
  const plugins = [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
  ];

  // Only import cartographer in Replit
  if (process.env.REPL_ID) {
    const cartographerModule = await import("@replit/vite-plugin-cartographer").catch(() => null);
    if (cartographerModule) {
      plugins.push(cartographerModule.cartographer());
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "client", "src"),
        "@shared": path.resolve(__dirname, "shared"),
      },
    },
    // Keep the root as client
    root: path.resolve(__dirname, "client"),
    build: {
      // Output the build to a "dist" folder in the project root
      outDir: path.resolve(__dirname, "dist"),
      emptyOutDir: true,
    },
  };
});
