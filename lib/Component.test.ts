import Component from "./Component";
import Document from "./Document";

describe("Component tests", () => {
    it("inherit", () => {
        const doc = new Document({ window });
        Component.setDocument(doc);
        const componentA = new Component({
            template: `<pre>Hello</pre>`,
        });
        const componentB = new Component({
            inherit: componentA,
        });
        componentB.mount();
        expect(componentB.getRootElement()).toBe(componentA.getRootElement());
    });
});
