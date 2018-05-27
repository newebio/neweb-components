import { BehaviorSubject } from "rxjs";
import { domNodeToJson } from "../util";
import Document from "./../Document";
import TextNode from "./TextNode";
const doc = new Document({
    window,
});
describe("Text component tests", () => {
    it("when value is string", () => {
        const value = new BehaviorSubject<string>("test");
        const text = new TextNode({
            document: doc,
            value,
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
        value.next("test2");
        expect(
            domNodeToJson(text.getRootElement()),
        ).toEqual({
            childNodes: [],
            nodeType: 3,
            nodeName: "#text",
            nodeValue: "test2",
        });
    });
});
