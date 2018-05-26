import Document from "./../Document";
import ElementComponent from "./ElementComponent";
import List from "./List";

describe("Link component tests", () => {
    const doc = new Document({
        window,
    });
    it("list with render one element from template", () => {
        const template = `<ul><li class="li1"></li></ul>`;
        const list = new List({
            document: doc,
            items: ["item1", "item2"],
        });
        const root = doc.createElement("div");
        root.innerHTML = template;
        list.mount(root.childNodes[0] as Element);
        expect(list.getRootElement().outerHTML).toBe(
            `<ul><li class="li1">item1</li><li class="li1">item2</li></ul>`);
    });
    it("list when render item is component", () => {
        const list = new List({
            document: doc,
            items: ["item1", "item2"],
            renderItem: (item) => new ElementComponent({
                tagName: "p",
                innerHTML: item,
            }),
            tagName: "div",
        });
        list.mount();
        expect(list.getRootElement().outerHTML).toBe(
            `<div><p>item1</p><p>item2</p></div>`,
        );
    });
});
