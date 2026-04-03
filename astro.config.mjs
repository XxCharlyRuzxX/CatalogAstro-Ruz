import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';
import react from "@astrojs/react";
import icon from "astro-icon";


export default defineConfig({
  output: 'server',
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [react(),icon()],
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ["@mui/material", "@mui/system", "@mui/icons-material", "@mui/x-data-grid"],
    },
  }
});