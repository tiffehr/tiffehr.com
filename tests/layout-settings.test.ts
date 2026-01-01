import { describe, it, expect } from "vitest";
import * as layoutSettings from "../src/routes/+layout";

describe("Static build (+layout.ts)", () => {
    it("prerendering should be setup correctly", () => {
        expect(layoutSettings).toHaveProperty("prerender");
        expect(layoutSettings.prerender).toBe(true);
        expect(typeof layoutSettings.prerender).toBe("boolean");
    });

    it("trailingSlash should be set correctly", () => {
        expect(layoutSettings).toHaveProperty("trailingSlash");
        expect(layoutSettings.trailingSlash).toBe("always");
        expect(typeof layoutSettings.trailingSlash).toBe("string");

        const validValues = ["always", "never", "ignore"];
        expect(validValues).toContain(layoutSettings.trailingSlash);
    });

    it("should only export expected settings", () => {
        const exportedKeys = Object.keys(layoutSettings);
        const expectedKeys = ["prerender", "trailingSlash"];

        expect(exportedKeys.sort()).toEqual(expectedKeys.sort());
        expect(exportedKeys.length).toBe(2);
    });
});
