import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
import cartographer from "@replit/vite-plugin-cartographer"; // ✅ Static import

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [cartographer()]
      : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // ✅ Fix: No need for "client/src"
      "@shared": path.resolve(__dirname, "shared"),
    },
  },
  root: __dirname, // ✅ Ensures correct root detection
  build: {
    outDir: path.resolve(__dirname, "client", "dist"), // ✅ Fix for Vercel deployment
    emptyOutDir: true,
    rollupOptions: {
      external: ["server"], // ✅ Prevents bundling backend into frontend
    },
  },
});

