"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const util_1 = require("../util");
const Document_1 = require("./../Document");
const Text_1 = require("./Text");
const doc = new Document_1.default({
    window,
});
describe("Text component tests", () => {
    it("when value is string", () => {
        const text = new Text_1.default({
            document: doc,
            value: rxjs_1.of("test"),
        });
        text.mount();
        expect(util_1.domNodeToJson(text.getRootElement())).toEqual({
            childNodes: [],
            nodeType: 3,
            nodeName: "#text",
            nodeValue: "test",
        });
    });
});
