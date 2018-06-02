"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const of_1 = require("rxjs/observable/of");
const Subject_1 = require("rxjs/Subject");
const util_1 = require("../util");
const Document_1 = require("./../Document");
const ElementComponent_1 = require("./ElementComponent");
const doc = new Document_1.default({
    window,
});
describe("ElementComponent tests", () => {
    it("bind attribute", () => {
        const element1 = new ElementComponent_1.default({
            document: doc,
            attributes: {
                attr1: of_1.of("attr1Value"),
            },
        });
        element1.mount();
        expect(util_1.domNodeToJson(element1.getRootElement())).toEqual({
            attributes: {
                attr1: "attr1Value",
            },
            tagName: "div", childNodes: [], nodeType: 1,
        });
    });
    it("bind property", () => {
        const checked$ = new rxjs_1.BehaviorSubject(true);
        const element1 = new ElementComponent_1.default({
            document: doc,
            tagName: "input",
            properties: {
                type: "checkbox",
                checked: checked$,
            },
        });
        element1.mount();
        expect(element1.getRootElement().checked).toBe(true);
        checked$.next(false);
        expect(element1.getRootElement().checked).toBe(false);
    });
    it("bind event", () => {
        const event1 = new Subject_1.Subject();
        const event1Fn = jest.fn();
        event1.subscribe(event1Fn);
        const element1 = new ElementComponent_1.default({
            document: doc,
            events: {
                event1,
            },
        });
        element1.mount();
        const e = new Event("event1");
        element1.getRootElement().dispatchEvent(e);
        expect(event1Fn.mock.calls.length).toBe(1);
        expect(event1Fn.mock.calls[0][0]).toBe(e);
    });
    it("bind innerHTML", () => {
        const innerHTML = of_1.of("html1");
        const element1 = new ElementComponent_1.default({
            document: doc,
            innerHTML,
        });
        element1.mount();
        expect(util_1.domNodeToJson(element1.getRootElement())).toEqual({
            tagName: "div",
            childNodes: [{
                    nodeType: 3,
                    nodeName: "#text",
                    nodeValue: "html1",
                }],
            nodeType: 1,
        });
    });
    it("custom tagName", () => {
        const element1 = new ElementComponent_1.default({
            document: doc,
            tagName: "pre",
        });
        element1.mount();
        expect(element1.getRootElement().tagName.toLowerCase()).toBe("pre");
    });
});
