"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Document_1 = require("./../Document");
const ElementComponent_1 = require("./ElementComponent");
const List_1 = require("./List");
describe("Link component tests", () => {
    const doc = new Document_1.default({
        window,
    });
    it("list with render one element from template", () => {
        const template = `<ul><li class="li1"></li></ul>`;
        const list = new List_1.default({
            document: doc,
            items: ["item1", "item2"],
        });
        const root = doc.createElement("div");
        root.innerHTML = template;
        list.mount(root.childNodes[0]);
        expect(list.getRootElement().outerHTML).toBe(`<ul><li class="li1">item1</li><li class="li1">item2</li></ul>`);
    });
    it("list when render item is component", () => {
        const list = new List_1.default({
            document: doc,
            items: ["item1", "item2"],
            renderItem: (item) => new ElementComponent_1.default({
                tagName: "p",
                innerHTML: item,
            }),
            tagName: "div",
        });
        list.mount();
        expect(list.getRootElement().outerHTML).toBe(`<div><p>item1</p><p>item2</p></div>`);
    });
});
