import { describe, it, expect } from "vitest";
import { render, screen, type Queries, type RenderResult } from "@testing-library/svelte/svelte5";
import Page from "../src/routes/+page.svelte";
import type { SvelteComponent } from "svelte";

describe("Homepage", () => {
  let component: RenderResult<SvelteComponent<Record<string, any>, any, any>, Queries>;
  let container: HTMLElement;

  beforeEach(() => {
    component = render(Page);
    container = component.container;
  });

  it("renders the correct <article> structure", () => {
    const section = container.querySelector("article");
    expect(section).toBeInTheDocument();
  });
});
