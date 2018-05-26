import { of } from "rxjs";
import { domNodeToJson } from "../util";
import Document from "./../Document";
import DynamicComponent from "./DynamicComponent";
import Text from "./Text";

describe("Dynamic component tests", () => {
    const doc = new Document({
        window,
    });
    it("bind component", () => {
        const text = new Text({
            value: "value1",
        });
        const dynamic1 = new DynamicComponent({
            component: of(text),
            document: doc,
        });
        dynamic1.mount();
        expect(domNodeToJson(dynamic1.getRootElement())).toEqual({
            attributes: {},
            nodeType: 1,
            tagName: "div",
            childNodes: [{
                nodeName: "#text",
                nodeType: 3,
                nodeValue: "value1",
            }],
        });
    });
});
