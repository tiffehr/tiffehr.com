/// <reference types="vitest" />
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: undefined, // Silence SvelteKit warning
  plugins: [sveltekit()],
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest-setup.ts"]
  }
});
