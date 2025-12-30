import { describe, it, expect } from "vitest";
import { render, type Queries, type RenderResult } from "@testing-library/svelte/svelte5";
import Layout from "../src/routes/+layout.svelte";
import type { SvelteComponent } from "svelte";

describe("Layout Component", () => {
  let component: RenderResult<SvelteComponent<Record<string, any>, any, any>, Queries>;
  let container: HTMLElement;

  beforeAll(() => {
    component = render(Layout as any, {
      props: {
        children: () => { }
      }
    });
    container = component.container;
  });

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

  it("renders the copyright", () => {
    const copyright = component.getByRole("heading", { name: "Copyright" });
    expect(copyright).toBeInTheDocument();
  });
});
