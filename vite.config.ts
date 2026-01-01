/// <reference types="vitest" />
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vitest/config";

export default defineConfig({
  base: undefined, // Silence SvelteKit warning
  plugins: [sveltekit()],
  build: {
    sourcemap: true,
    minify: true
  },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest-setup.ts"],
    exclude: ["node_modules", ".svelte-kit", "static/*.{png,jpg,jpeg,gif,svg,webp,pdf}"],
    coverage: {
      exclude: [
        "tests/**",
        "src/lib/assets/**",
        "types/**",
        "static/*.{png,jpg,jpeg,gif,svg,webp,pdf}",
        "**/*.d.ts",
        "**/*.scss"
      ]
    }
  }
});
