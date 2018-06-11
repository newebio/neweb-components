"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const Document_1 = require("./../Document");
const InputComponent_1 = require("./InputComponent");
describe("InputComponent tests", () => {
    const doc = new Document_1.default({
        window,
    });
    it("trigger input event", () => {
        const value = new BehaviorSubject_1.BehaviorSubject("");
        const input = new InputComponent_1.default({
            document: doc,
            value,
        });
        input.mount();
        input.getRootElement().value = "val2";
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe("val2");
    });
    it("number input", () => {
        const value = new BehaviorSubject_1.BehaviorSubject(100);
        const input = new InputComponent_1.default({
            document: doc,
            value,
            format: {
                from: (str) => parseInt(str, 10),
            },
        });
        input.mount();
        expect(input.getRootElement().value).toBe("100");
        input.getRootElement().value = "101";
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe(101);
    });
    it("trigger stream only after changing value", () => {
        const value = new BehaviorSubject_1.BehaviorSubject("1");
        const fn = jest.fn();
        value.subscribe(fn);
        const input = new InputComponent_1.default({
            value,
        });
        input.mount();
        input.getRootElement().value = "102";
        input.getRootElement().dispatchEvent(new Event("input"));
        input.getRootElement().dispatchEvent(new Event("change"));
        expect(fn.mock.calls.length).toBe(2);
    });
});
