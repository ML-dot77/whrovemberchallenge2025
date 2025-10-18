import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      recharts: "recharts/es6/index.js",
    },
  },
  optimizeDeps: {
    include: ["recharts"],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
});
