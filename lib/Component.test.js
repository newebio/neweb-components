"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const Document_1 = require("./Document");
describe("Component tests", () => {
    it("inherit", () => {
        const doc = new Document_1.default({ window });
        Component_1.default.setDocument(doc);
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
