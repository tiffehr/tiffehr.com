import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/svelte/svelte5";
import "@testing-library/jest-dom/vitest";

// Mock SvelteKit modules
vi.mock("$app/paths", () => ({
  base: "",
  resolve: (path: string) => path
}));

vi.mock("$app/navigation", () => ({
  goto: vi.fn(),
  afterNavigate: vi.fn(),
  beforeNavigate: vi.fn()
}));

vi.mock("$env/static/public", () => ({
  PUBLIC_BASE_URL: "https://tiffehr.com",
  PUBLIC_TITLE: "Tiff Fehr"
}));

// Cleanup after each test
afterEach(() => {
  cleanup();
});
