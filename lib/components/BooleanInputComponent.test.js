"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Document_1 = require("./../Document");
const BooleanInputComponent_1 = require("./BooleanInputComponent");
describe("BooleanInputComponent tests", () => {
    it("trigger input checkbox", () => {
        const doc = new Document_1.default({
            window,
        });
        const value = new rxjs_1.BehaviorSubject(true);
        const input = new BooleanInputComponent_1.default({
            document: doc,
            value,
        });
        const div = doc.createElement("div");
        div.innerHTML = `<input type="checkbox" />`;
        input.mount(div.childNodes[0]);
        input.getRootElement().checked = false;
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe(false);
        input.getRootElement().checked = true;
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe(true);
    });
});
