import { of } from "rxjs/observable/of";
import { Subject } from "rxjs/Subject";
import { domNodeToJson } from "../util";
import Document from "./../Document";
import ElementComponent from "./ElementComponent";
const doc = new Document({
    window,
});
describe("ElementComponent tests", () => {
    it("bind attribute", () => {
        const element1 = new ElementComponent({
            document: doc,
            attributes: {
                attr1: of("attr1Value"),
            },
        });
        element1.mount();
        expect(domNodeToJson(element1.getRootElement())).toEqual(
            {
                attributes: {
                    attr1: "attr1Value",
                },
                tagName: "div", childNodes: [], nodeType: 1,
            },
        );
    });
    it("bind event", () => {
        const event1 = new Subject<any>();
        const event1Fn = jest.fn();
        event1.subscribe(event1Fn);
        const element1 = new ElementComponent({
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
        const innerHTML = of("html1");
        const element1 = new ElementComponent({
            document: doc,
            innerHTML,
        });
        element1.mount();
        expect(domNodeToJson(element1.getRootElement())).toEqual(
            {
                tagName: "div",
                childNodes: [{
                    nodeType: 3,
                    nodeName: "#text",
                    nodeValue: "html1",
                }],
                nodeType: 1,
            },
        );
    });
    it("custom tagName", () => {
        const element1 = new ElementComponent ({
            document: doc,
            tagName: "pre",
        });
        element1.mount();
        expect(element1.getRootElement().tagName.toLowerCase()).toBe("pre");
    });
});
