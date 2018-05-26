"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = require("./../Document");
const Link_1 = require("./Link");
describe("Link component tests", () => {
    const doc = new Document_1.default({
        window,
    });
    let mockNavigate;
    const url = "/url1";
    beforeAll(() => {
        mockNavigate = spyOn(doc, "navigate");
    });
    it("trigger click", () => {
        const link = new Link_1.default({
            document: doc,
            url,
        });
        link.mount();
        link.getRootElement().dispatchEvent(new Event("click"));
        expect(mockNavigate.calls.allArgs()).toEqual([[url, false]]);
    });
    it("when tagName is `a`", () => {
        const link = new Link_1.default({
            document: doc,
            url,
            tagName: "a",
        });
        link.mount();
        link.getRootElement().dispatchEvent(new Event("click"));
        expect(link.getRootElement().getAttribute("href")).toBe(url);
    });
});
