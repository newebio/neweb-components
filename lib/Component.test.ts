import Component from "./Component";

describe("Component tests", () => {
    it("inherit", () => {
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
