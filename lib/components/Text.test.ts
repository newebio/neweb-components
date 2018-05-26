import { of } from "rxjs";
import { domNodeToJson } from "../util";
import Document from "./../Document";
import Text from "./Text";
const doc = new Document({
    window,
});
describe("Text component tests", () => {
    it("when value is string", () => {
        const text = new Text({
            document: doc,
            value: of("test"),
        });
        text.mount();
        expect(
            domNodeToJson(text.getRootElement()),
        ).toEqual({
            childNodes: [],
            nodeType: 3,
            nodeName: "#text",
            nodeValue: "test",
        });
    });
});
