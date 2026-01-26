import path from "node:path";

import tailwindcss from "@tailwindcss/vite";
import basicSsl from "@vitejs/plugin-basic-ssl";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    tailwindcss(),
    svgr(),
    basicSsl(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),

    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
        suppressWarnings: true,
        type: "classic",
      },
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff,woff2}"],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    proxy: {
      "/api": {
        target: "https://api.moamoa.io.kr",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
