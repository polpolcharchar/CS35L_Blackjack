import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter()],
  server: {
    host: true,
    port: 5173,
    strictPort: false,
    proxy: {
      "/api": "http://localhost:5000"
    }
  }
});
