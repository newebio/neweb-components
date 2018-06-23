import Component from "./Component";
import TextNode from "./components/TextNode";

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
    it("when elements prop exists should add to elements", () => {
        const componentA = new Component({
            elements: {
                comp2: new TextNode({
                    value: "ElementsProp",
                }),
            },
            template: `Hello, <div name="comp2"></div>!`,
        });
        componentA.mount();
        expect(componentA.getRootElement().textContent).toBe(`Hello, ElementsProp!`);
    });
});
