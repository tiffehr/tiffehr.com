import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte/svelte5";

import Page from "../src/routes/+page.svelte";

describe("Page", () => {
  let component: ReturnType<typeof render>;
  let container: HTMLElement;

  beforeEach(() => {
    component = render(Page);
    container = component.container;
  });

  describe("<head>", () => {
    it("renders the correct canonical tag", () => {
      const canonical = document.querySelector("link[rel='canonical']");
      expect(canonical).toBeInTheDocument();
      expect(canonical?.hasAttribute("href")).toBeTruthy();
      expect(canonical?.getAttribute("href")).toContain("tiffehr.com");
      expect(canonical?.getAttribute("href")).not.toContain("www.");
    });

    it("renders the correct <title> tag", () => {
      const title = document.querySelector("title");
      expect(title).toBeInTheDocument();
      expect(title?.textContent).toContain("tiffehr.com");
    });

    it("renders the correct <meta name='description'> tag", () => {
      const desc = document.querySelector(`meta[name="description"]`);
      expect(desc).toBeInTheDocument();
      expect(desc).toHaveAttribute("content");

      const content = desc?.getAttribute("content");
      expect(content).toContain("tiffehr.com");
    });

    ["og:url", "og:description", "og:title"].forEach((tag) => {
      it(`renders the correct <meta property='${tag}'> tag`, () => {
        const meta = document.querySelector(`meta[property='${tag}']`);
        expect(meta).toBeInTheDocument();
        expect(meta).toHaveAttribute("content");

        // can't be null or empty string, must be a semi-valid text pattern
        const content = meta?.getAttribute("content");
        expect(content).not.toBe(null);
        expect(content).not.toBe(expect.stringContaining(""));
        // expect(content).toBe(expect.any(String));
      });
    });
  });

  describe("<body>", () => {
    it("renders the correct <article> structure", () => {
      const article = container.querySelector("article");
      expect(article).toBeInTheDocument();
    });

    it("renders the #links list", () => {
      const links = container.querySelector("ul#links");
      expect(links).toBeInTheDocument();
      const listItems = links?.querySelectorAll("li");
      expect(listItems?.length).toBeGreaterThan(0);
    });
  });
});
