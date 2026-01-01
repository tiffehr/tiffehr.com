import { describe, it, expect } from "vitest";
import { promises as fs } from "fs";
import path from "path";

describe("build output", () => {
  const buildDir = path.resolve(__dirname, "../build");
  const requiredFiles = ["CNAME", ".nojekyll", "robots.txt", "sitemap.xml"];

  for (const file of requiredFiles) {
    it(`should contain ${file}`, async () => {
      const filePath = path.join(buildDir, file);
      let exists = false;
      try {
        const stat = await fs.stat(filePath);
        exists = stat.isFile();
      } catch (e) {
        exists = false;
      }
      expect(exists).toBe(true);
    });
  }

  it.skip("should contain at least one compressed sitemap.xml", async () => {
    const files = await fs.readdir(buildDir);
    const sitemapBr = files.filter((f) => f.startsWith("sitemap.xml") && f.endsWith(".br"));
    expect(sitemapBr.length).toBeGreaterThanOrEqual(1);
  });
});
