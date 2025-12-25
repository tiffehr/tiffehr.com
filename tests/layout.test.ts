import { describe, it, expect } from "vitest";
import { render } from "@testing-library/svelte/svelte5";
import Layout from "../src/routes/+layout.svelte";

describe("Layout Component", () => {
  it("renders the main content area", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { container } = render(Layout as any, {
      props: {
        children: () => {}
      }
    });
    const main = container.querySelector("main");

    expect(main).toBeInTheDocument();
  });

  it("has correct structure", () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { container } = render(Layout as any, {
      props: {
        children: () => {}
      }
    });
    expect(container).toBeTruthy();
  });
});
