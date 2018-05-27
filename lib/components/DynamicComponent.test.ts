import { BehaviorSubject, of } from "rxjs";
import { Component } from "../..";
import Document from "./../Document";
import DynamicComponent from "./DynamicComponent";
import ElementComponent from "./ElementComponent";

describe("Dynamic component tests", () => {
    const doc = new Document({
        window,
    });
    it("bind component and next", () => {
        const el1 = new ElementComponent({
            tagName: "pre",
            innerHTML: of("value1"),
        });
        const el2 = new ElementComponent({
            tagName: "strong",
            innerHTML: of("value2"),
        });
        const child = new BehaviorSubject<Component<any>>(el1);
        const dynamic1 = new DynamicComponent({
            component: child,
            document: doc,
        });
        dynamic1.mount();
        expect(dynamic1.getRootElement().outerHTML).toBe(`<div><pre>value1</pre></div>`);
        child.next(el2);
        expect(dynamic1.getRootElement().outerHTML).toBe(`<div><strong>value2</strong></div>`);
    });
});
