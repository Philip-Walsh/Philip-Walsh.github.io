import { defineConfig } from "vite";

export default defineConfig({
  server: {
    open: true,
    port: 3000,
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
