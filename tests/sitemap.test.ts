import { describe, it, expect, beforeEach } from "vitest";
import { GET } from "../src/routes/sitemap.xml/+server";

describe("robots.txt Server Endpoint", () => {
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
