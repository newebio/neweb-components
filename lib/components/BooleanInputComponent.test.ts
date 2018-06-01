import { BehaviorSubject } from "rxjs";
import Document from "./../Document";
import BooleanInputComponent from "./BooleanInputComponent";

describe("BooleanInputComponent tests", () => {
    it("trigger input checkbox", () => {
        const doc = new Document({
            window,
        });
        const value = new BehaviorSubject<boolean>(true);
        const input = new BooleanInputComponent({
            document: doc,
            value,
        });
        const div = doc.createElement("div");
        div.innerHTML = `<input type="checkbox" />`;
        input.mount(div.childNodes[0] as Element);
        input.getRootElement().checked = false;
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe(false);
        input.getRootElement().checked = true;
        input.getRootElement().dispatchEvent(new Event("input"));
        expect(value.getValue()).toBe(true);
    });
});
