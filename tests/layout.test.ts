import type { Queries, RenderResult } from "@testing-library/svelte/svelte5";
import type { SvelteComponent } from "svelte";

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte/svelte5";

import Layout from "../src/routes/+layout.svelte";

describe("Layout Component", () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let component: RenderResult<SvelteComponent<Record<string, any>, any, any>, Queries>;
  let container: HTMLElement;

  beforeEach(() => {
    component = render(Layout);
    container = component.container;
  });

  [
    "html",
    "head",
    "body",
  ].forEach((tag) => {
    it(`renders a <${tag}> tag`, () => {
      const el = document.querySelector(tag);
      expect(el).toBeInTheDocument();
    });
  });

  describe("<head>", () => {

    [
      // "charset",
      "name='viewport'",
      "name='robots'",
      "property='og:type'",
      "property='og:image'",
    ].forEach((name) => {
      it(`renders an expected 'meta[${name}]' tag`, () => {
        const meta = document.querySelector(`meta[${name}]`);
        expect(meta).toBeInTheDocument();
        expect(meta?.hasAttribute("content")).toBeTruthy();
      });
    });

    it.skip("renders a favicon", () => {
      const icon = document.querySelector("link[rel='icon']");
      expect(icon).toBeInTheDocument();
      expect(icon?.hasAttribute("href")).toBeTruthy();
      expect(icon?.getAttribute("href")).toContain("data:image");
    });

    it("renders an meta['author'] tag", () => {
      const author = document.querySelector("meta[name='author']");
      expect(author).toBeInTheDocument();
      expect(author?.hasAttribute("content")).toBeTruthy();
      expect(author?.getAttribute("content")).toContain("Tiff Fehr");
    });

    it("renders an meta['fediverse:creator'] tag", () => {
      const author = document.querySelector("meta[name='fediverse:creator']");
      expect(author).toBeInTheDocument();
      expect(author?.hasAttribute("content")).toBeTruthy();
      expect(author?.getAttribute("content")).toContain("@tiffehr@journa.host");
    });

    it.todo("tests font preloading");
  });

  describe("<body>", () => {
    it("renders proper SvelteKit components", () => {
      expect(container).toBeTruthy();
    });

    ["header", "h1", "main", "footer", "h2"].forEach((tag) => {
      it(`renders the correct <${tag}> structure`, () => {
        const main = container.querySelector(tag);
        expect(main).toBeInTheDocument();
      });
    });

    it("renders the main heading", () => {
      const heading = component.getByRole("heading", { name: "Header" });
      expect(heading).toBeInTheDocument();
    });

    it.skip("renders the brand div", () => {
      const brand = component.getElementById("brand");
      expect(brand).toBeInTheDocument();
    });

    describe("<footer>", () => {
      it("renders the copyright", () => {
        const copyright = component.getByRole("heading", { name: "Copyright" }) as HTMLElement;
        expect(copyright).toBeInTheDocument();
        const copyrightText = copyright.textContent;
        expect(copyrightText).toContain("tiffehr.com ©");
        expect(copyrightText).toContain("all rights");
      });

      it("displays the tiffehr.com link", () => {
        const footer = screen.getByRole("contentinfo");
        const links = screen.getAllByRole("link", { name: /tiffehr/i });

        expect(links.some((link) => footer.contains(link))).toBe(true);
      });

      it("displays the Gasworks Data link", () => {
        const gasworksLink = screen.getByRole("link", { name: /gasworks data/i });

        expect(gasworksLink).toBeInTheDocument();
        expect(gasworksLink.getAttribute("href")).toBe("https://gasworksdata.com/");
      });

      it("displays the human-made link", () => {
        const humanMadeLink = screen.getByRole("link", { name: /human-made/i });

        expect(humanMadeLink).toBeInTheDocument();
        expect(humanMadeLink.getAttribute("href")).toBe("https://thehumanmade.org");
      });

      it("displays a `rel='me'` link to Mastodon", () => {
        const relMe = screen.getByRole("link", { name: /me/i });

        expect(relMe).toBeInTheDocument();
        expect(relMe.getAttribute("rel")).toBe("me");
      });

      it("displays the current year in copyright", () => {
        const footer = container.querySelector("footer");
        const currentYear = new Date().getFullYear();

        expect(footer?.textContent).toContain(currentYear.toString());
      });

      it("displays 'all rights reserved' text", () => {
        const footer = container.querySelector("footer");

        expect(footer?.textContent).toContain("all rights reserved");
      });

      it("renders a JSON-LD schema.org block", () => {
        const jsonLd = container.querySelector("script[type='application/ld+json']");

        expect(jsonLd).toBeInTheDocument();
      });

      it("renders a darkvisitors script tag", () => {
        const darkVisitors = container.querySelector("script[async]");

        expect(darkVisitors).toBeInTheDocument();
      });
    });
  });
});
