import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    assetsInlineLimit: 1000000, // 1Mo - augmente la limite pour inline les SVG plus gros
  },
});
