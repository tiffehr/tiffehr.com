import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/svelte/svelte5";
import Page from "../src/routes/+page.svelte";

describe("Homepage", () => {
  it("renders the main heading", () => {
    render(Page);
    const heading = screen.getByRole("heading", { name: /welcome/i });
    expect(heading).toBeInTheDocument();
  });

  it("displays the hero section", () => {
    const { container } = render(Page);
    const hero = container.querySelector(".hero");

    expect(hero).toBeInTheDocument();
  });

  it("has correct page structure", () => {
    const { container } = render(Page);
    const section = container.querySelector("section.hero");

    expect(section).toBeInTheDocument();
  });
});
