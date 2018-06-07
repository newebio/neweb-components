"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
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
});
