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
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (
              id.includes("react") ||
              id.includes("react-dom") ||
              id.includes("react-router-dom") ||
              id.includes("zustand")
            ) {
              return "react-vendor";
            }
            if (id.includes("motion")) {
              return "motion-vendor";
            }
            if (
              id.includes("@tanstack") ||
              id.includes("axios") ||
              id.includes("react-hook-form")
            ) {
              return "data-vendor";
            }
            if (
              id.includes("react") ||
              id.includes("scheduler") ||
              id.includes("zustand")
            ) {
              return "react-vendor";
            }
            return "vendor";
          }
        },
      },
    },
  },
  server: {
    host: true,
  },
});
