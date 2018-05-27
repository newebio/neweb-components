"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Document_1 = require("./../Document");
const DynamicComponent_1 = require("./DynamicComponent");
const ElementComponent_1 = require("./ElementComponent");
describe("Dynamic component tests", () => {
    const doc = new Document_1.default({
        window,
    });
    it("bind component and next", () => {
        const el1 = new ElementComponent_1.default({
            tagName: "pre",
            innerHTML: rxjs_1.of("value1"),
        });
        const el2 = new ElementComponent_1.default({
            tagName: "strong",
            innerHTML: rxjs_1.of("value2"),
        });
        const child = new rxjs_1.BehaviorSubject(el1);
        const dynamic1 = new DynamicComponent_1.default({
            component: child,
            document: doc,
        });
        dynamic1.mount();
        expect(dynamic1.getRootElement().outerHTML).toBe(`<div><pre>value1</pre></div>`);
        child.next(el2);
        expect(dynamic1.getRootElement().outerHTML).toBe(`<div><strong>value2</strong></div>`);
    });
});
