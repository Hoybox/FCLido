import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // dossier de build pour Express
    emptyOutDir: true, // nettoie avant chaque build
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 10000, // pour Render
  },
  base: "./", // ⚠️ <-- CHANGE ICI : "./" au lieu de "/"
});
