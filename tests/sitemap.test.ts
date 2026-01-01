import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "../src/routes/sitemap.xml/+server";

describe("robots.txt generation", () => {
  let response: Response;
  let content: string;

  beforeEach(async () => {
    response = await GET();
    content = await response.text();
  });

  describe("Response", () => {
    it("returns a Response object", () => {
      expect(response).toBeInstanceOf(Response);
    });

    it("has correct Content-Type header", () => {
      expect(response.headers.get("Content-Type")).toBe("application/xml");
    });

    it("returns a 200 status", () => {
      expect(response.status).toBe(200);
    });

    it("returns non-empty content", () => {
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(0);
    });
  });

  describe("Content Structure", () => {

    it("includes the site URL", () => {
      expect(content).toContain("https://tiffehr.com/");
    });

    it("uses fallback URL when PUBLIC_BASE_URL is not set", async () => {
      // Temporarily override the mock to test the fallback behavior
      const { vi } = await import("vitest");

      // Mock with undefined PUBLIC_BASE_URL
      vi.doMock("$env/static/public", () => ({
        PUBLIC_BASE_URL: "",  // Empty string to trigger the fallback
        PUBLIC_TITLE: "Tiff Fehr"
      }));

      // Clear the module cache and re-import
      vi.resetModules();
      const { GET: getFallback } = await import("../src/routes/sitemap.xml/+server");
      const fallbackResponse = await getFallback();
      const fallbackContent = await fallbackResponse.text();

      // Should use the fallback URL
      expect(fallbackContent).toContain("https://tiffehr.com/");

      // Clean up
      vi.doUnmock("$env/static/public");
      vi.resetModules();
    });

    it("includes <urlset> tag", () => {
      expect(content).toContain("urlset");
    });

    it("includes <url> tag", () => {
      expect(content).toContain("url");
    });

    it("includes <loc> tag", () => {
      expect(content).toContain("loc");
    });
  });

  describe.skip("Format Validation", () => {
    it("has proper sitemap.xml format", () => {
      const lines = content.split("\n");
      const userAgentLines = lines.filter((line) => line.startsWith("User-agent:"));
      const disallowLines = lines.filter((line) => line.startsWith("Disallow:"));

      expect(userAgentLines.length).toBeGreaterThan(0);
      expect(disallowLines.length).toBeGreaterThan(0);
    });
  });
});
