import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ command }) => {
  const isDev = command === "serve";

  return {
    plugins: [react(), tailwindcss()],
    ...(isDev && {
      server: {
        proxy: {
          "/api": "http://localhost:3000",
        },
      },
    }),
  };
});
