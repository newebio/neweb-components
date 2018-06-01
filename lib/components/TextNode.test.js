"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const util_1 = require("../util");
const Document_1 = require("./../Document");
const TextNode_1 = require("./TextNode");
const doc = new Document_1.default({
    window,
});
describe("Text component tests", () => {
    it("when value is string", () => {
        const value = new BehaviorSubject_1.BehaviorSubject("test");
        const text = new TextNode_1.default({
            document: doc,
            value,
        });
        text.mount();
        expect(util_1.domNodeToJson(text.getRootElement())).toEqual({
            childNodes: [],
            nodeType: 3,
            nodeName: "#text",
            nodeValue: "test",
        });
        value.next("test2");
        expect(util_1.domNodeToJson(text.getRootElement())).toEqual({
            childNodes: [],
            nodeType: 3,
            nodeName: "#text",
            nodeValue: "test2",
        });
    });
});
