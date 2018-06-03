"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const of_1 = require("rxjs/observable/of");
const Document_1 = require("./../Document");
const ElementComponent_1 = require("./ElementComponent");
const ParentComponent_1 = require("./ParentComponent");
describe("Dynamic component tests", () => {
    const doc = new Document_1.default({
        window,
    });
    it("bind component and next", () => {
        const el1 = new ElementComponent_1.default({
            tagName: "pre",
            innerHTML: of_1.of("value1"),
        });
        const el2 = new ElementComponent_1.default({
            tagName: "strong",
            innerHTML: of_1.of("value2"),
        });
        const child = new BehaviorSubject_1.BehaviorSubject(el1);
        const dynamic1 = new ParentComponent_1.default({
            component: child,
            document: doc,
        });
        dynamic1.mount();
        expect(dynamic1.getRootElement().outerHTML).toBe(`<div><pre>value1</pre></div>`);
        child.next(el2);
        expect(dynamic1.getRootElement().outerHTML).toBe(`<div><strong>value2</strong></div>`);
        child.next(undefined);
        expect(dynamic1.getRootElement().innerHTML).toBe(``);
    });
});
