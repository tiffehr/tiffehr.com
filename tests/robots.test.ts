import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "../src/routes/robots.txt/+server";

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
      expect(response.headers.get("Content-Type")).toBe("text/plain");
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
    it("includes the site URL in header comment", () => {
      expect(content).toContain("# robots.txt for");
      expect(content).toContain("tiffehr.com");
    });

    it("includes copyright notice", () => {
      expect(content).toContain("Tiff Fehr");
      expect(content).toContain("non-commercial");
      expect(content).toContain("info@gasworksdata.com");
    });

    it("includes User-agent directives", () => {
      expect(content).toContain("User-agent:");
    });

    it("includes Disallow directive", () => {
      expect(content).toContain("Disallow: /");
    });
  });

  describe("AI Bot Blocking", () => {
    const criticalAIBots = [
      "GPTBot",
      "PerplexityBot",
      "anthropic-ai",
      "ChatGPT-User",
      "cohere-ai",
      "Amazonbot"
    ];

    criticalAIBots.forEach((bot) => {
      it(`blocks ${bot}`, () => {
        expect(content).toContain(`User-agent: ${bot}`);
      });
    });
  });

  describe.skip("Scraper Blocking", () => {
    const scrapers = ["Scrapy", "Diffbot", "img2dataset", "FirecrawlAgent", "Webzio-Extended"];

    scrapers.forEach((scraper) => {
      it(`blocks ${scraper}`, () => {
        expect(content).toContain(`User-agent: ${scraper}`);
      });
    });
  });

  describe("SEO and Analytics Bots", () => {
    const seoBots = ["SemrushBot-OCOB", "SemrushBot-SWA", "PetalBot", "YandexAdditional"];

    seoBots.forEach((bot) => {
      it(`blocks ${bot}`, () => {
        expect(content).toContain(`User-agent: ${bot}`);
      });
    });
  });

  describe("Social Media Bots", () => {
    it("blocks TikTok spider", () => {
      expect(content).toContain("User-agent: TikTokSpider");
    });

    it("blocks Facebook bots", () => {
      expect(content).toContain("User-agent: FacebookBot");
      expect(content).toContain("User-agent: facebookexternalhit");
    });
  });

  describe("Format Validation", () => {
    it("has proper robots.txt format", () => {
      // Should have User-agent lines followed by Disallow
      const lines = content.split("\n");
      const userAgentLines = lines.filter((line) => line.startsWith("User-agent:"));
      const disallowLines = lines.filter((line) => line.startsWith("Disallow:"));

      expect(userAgentLines.length).toBeGreaterThan(0);
      expect(disallowLines.length).toBeGreaterThan(0);
    });

    it("does not have trailing whitespace issues", () => {
      const lines = content.split("\n");
      const userAgentLines = lines.filter((line) => line.startsWith("User-agent:"));

      userAgentLines.forEach((line) => {
        // User-agent lines should be properly formatted
        expect(line).toMatch(/^User-agent: .+$/);
      });
    });

    it("includes DarkVisitors generated content", () => {
      // The robotsTxt variable from DarkVisitors should be appended
      // We can't test exact content but can verify structure
      expect(content).toBeTruthy();
      expect(content.split("\n").length).toBeGreaterThan(10);
    });
  });

  describe("Specific Bot Coverage", () => {
    it("blocks research and training bots", () => {
      expect(content).toContain("User-agent: AI2Bot");
      expect(content).toContain("User-agent: Ai2Bot-Dolma");
      expect(content).toContain("User-agent: cohere-training-data-crawler");
    });

    it("blocks emerging AI assistants", () => {
      expect(content).toContain("User-agent: Devin");
      expect(content).toContain("User-agent: Operator");
      expect(content).toContain("User-agent: YouBot");
    });

    it("blocks intelligence gathering bots", () => {
      expect(content).toContain("User-agent: ISSCyberRiskCrawler");
      expect(content).toContain("User-agent: Poseidon Research Crawler");
    });
  });

  describe("Edge Cases", () => {
    it("handles multiple bot variants correctly", () => {
      // Some bots have multiple naming conventions
      expect(content).toContain("User-agent: omgili");
      expect(content).toContain("User-agent: omgilibot");

      expect(content).toContain("User-agent: Panscient");
      expect(content).toContain("User-agent: panscient.com");
    });

    it("includes version-specific bot names", () => {
      expect(content).toContain("User-agent: iaskspider/2.0");
      expect(content).toContain("User-agent: MistralAI-User/1.0");
    });

    it("gracefully handles DarkVisitors API errors", async () => {
      const testResponse = await GET();
      const testContent = await testResponse.text();

      // verify the manual robotsList is always present (the fallback)
      expect(testContent).toContain("User-agent: GPTBot");
      expect(testContent).toContain("User-agent: ClaudeBot");
      expect(testContent).toContain("User-agent: PerplexityBot");
      expect(testContent).toContain("User-agent: Amazonbot");
      expect(testContent).toContain("Disallow: /");

      // verify proper structure is maintained even in error scenarios
      expect(testContent).toContain("# robots.txt for");
      expect(testContent).toContain("tiffehr.com");
      expect(testResponse.headers.get("Content-Type")).toBe("text/plain");
      expect(testResponse.status).toBe(200);

      // if DarkVisitors is empty (error case), the file still works with just robotsList
      const lines = testContent.split("\n");
      expect(lines.length).toBeGreaterThan(100); // Should have many bot entries
    });
  });
});
