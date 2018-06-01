import { BehaviorSubject } from "rxjs";
import Document from "./../Document";
import InputComponent from "./InputComponent";

describe("InputComponent tests", () => {
    const doc = new Document({
        window,
    });
    it("trigger input event", () => {
        const value = new BehaviorSubject<string>("");
        const input = new InputComponent({
            document: doc,
            value,
        });
        input.mount();
        input.getRootElement().value = "val2";
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe("val2");
    });
});
