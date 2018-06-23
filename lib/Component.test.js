"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const TextNode_1 = require("./components/TextNode");
describe("Component tests", () => {
    it("inherit", () => {
        const componentA = new Component_1.default({
            template: `<pre>Hello</pre>`,
        });
        const componentB = new Component_1.default({
            inherit: componentA,
        });
        componentB.mount();
        expect(componentB.getRootElement()).toBe(componentA.getRootElement());
    });
    it("when elements prop exists should add to elements", () => {
        const componentA = new Component_1.default({
            elements: {
                comp2: new TextNode_1.default({
                    value: "ElementsProp",
                }),
            },
            template: `Hello, <div name="comp2"></div>!`,
        });
        componentA.mount();
        expect(componentA.getRootElement().textContent).toBe(`Hello, ElementsProp!`);
    });
});
