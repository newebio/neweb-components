import Document from "./../Document";
import ElementComponent from "./ElementComponent";
import ListComponent from "./ListComponent";

describe("Link component tests", () => {
    const doc = new Document({
        window,
    });
    it("list with render one element from template", () => {
        const template = `<ul><li class="li1"></li></ul>`;
        const list = new ListComponent({
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
        const list = new ListComponent({
            document: doc,
            items: ["item1", "item2", "item3"],
            renderItem: (item, index, items) => new ElementComponent({
                tagName: "p",
                innerHTML: item + "::" + index + "::" + (items.length === index + 1 ? "last" : (
                    index === 0 ? "first" : "none"
                )),
            }),
            tagName: "div",
        });
        list.mount();
        expect(list.getRootElement().outerHTML).toBe(
            `<div><p>item1::0::first</p><p>item2::1::none</p><p>item3::2::last</p></div>`,
        );
    });
});
