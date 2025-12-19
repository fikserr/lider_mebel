import path from "path";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  server: {
    host: "127.0.0.1", // ✅ tashqi tarmoqdan ham kirish uchun
    port: process.env.PORT || 5173, // Railway o'z portini o‘zi beradi
  },
  plugins: [
    laravel({
      input: ["resources/css/app.css", "resources/js/app.jsx"],
      refresh: true,
    }),
    react(),
    visualizer({
      filename: "bundle-report.html",
      template: "treemap",
      open: false,
    }),
  ],
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "resources/js"),
      "@images": path.resolve(__dirname, "public/storage/assets/"),
      "@shared": path.resolve(__dirname, "resources/js/components/shared"),
      "@ui": path.resolve(__dirname, "resources/js/components/ui"),
    },
  },
  build: {
    rollupOptions: {
      treeshake: true,
    },
    minify: "terser",
    sourcemap: false,
  },
});
