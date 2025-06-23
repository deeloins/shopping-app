import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "../public", // Changed from 'dist' for Vercel compatibility
    chunkSizeWarningLimit: 1000, // Adjust based on your needs
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          chakra: ["@chakra-ui/react", "@emotion/react"],
        },
      },
    },
  },
});
