import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/University_Final_Project2y/",
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    port: 5173,
  },
});
