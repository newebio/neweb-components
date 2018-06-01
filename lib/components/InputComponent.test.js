"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Document_1 = require("./../Document");
const InputComponent_1 = require("./InputComponent");
describe("InputComponent tests", () => {
    const doc = new Document_1.default({
        window,
    });
    it("trigger input event", () => {
        const value = new rxjs_1.BehaviorSubject("");
        const input = new InputComponent_1.default({
            document: doc,
            value,
        });
        input.mount();
        input.getRootElement().value = "val2";
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe("val2");
    });
    it("trigger input checkbox", () => {
        const value = new rxjs_1.BehaviorSubject("");
        const input = new InputComponent_1.default({
            document: doc,
            value,
        });
        const div = doc.createElement("div");
        div.innerHTML = `<input type="checkbox" value="check1" />`;
        input.mount(div.childNodes[0]);
        input.getRootElement().checked = false;
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe("");
        input.getRootElement().checked = true;
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe("check1");
    });
});
