"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const util_1 = require("../util");
const Document_1 = require("./../Document");
const DynamicComponent_1 = require("./DynamicComponent");
const Text_1 = require("./Text");
describe("Dynamic component tests", () => {
    const doc = new Document_1.default({
        window,
    });
    it("bind component", () => {
        const text = new Text_1.default({
            value: "value1",
        });
        const dynamic1 = new DynamicComponent_1.default({
            component: rxjs_1.of(text),
            document: doc,
        });
        dynamic1.mount();
        expect(util_1.domNodeToJson(dynamic1.getRootElement())).toEqual({
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
