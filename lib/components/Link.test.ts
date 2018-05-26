import Document from "./../Document";
import Link from "./Link";

describe("Link component tests", () => {
    const doc = new Document({
        window,
    });
    let mockNavigate: jasmine.Spy;
    const url = "/url1";
    beforeAll(() => {
        mockNavigate = spyOn(doc, "navigate");
    });
    it("trigger click", () => {
        const link = new Link({
            document: doc,
            url,
        });
        link.mount();
        link.getRootElement().dispatchEvent(new Event("click"));
        expect(mockNavigate.calls.allArgs()).toEqual([[url, false]]);
    });
    it("when tagName is `a`", () => {
        const link = new Link({
            document: doc,
            url,
            tagName: "a",
        });
        link.mount();
        link.getRootElement().dispatchEvent(new Event("click"));
        expect(link.getRootElement().getAttribute("href")).toBe(url);
    });
});
