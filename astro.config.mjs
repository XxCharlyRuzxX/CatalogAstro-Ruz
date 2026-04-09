import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import icon from "astro-icon";

export default defineConfig({
  output: "server",
  adapter: vercel(),
  integrations: [react(), icon()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: [
        "@mui/material",
        "@mui/system",
        "@mui/icons-material",
        "@mui/x-data-grid",
      ],
    },
  },
});