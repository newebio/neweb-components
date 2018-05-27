"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const doc = new neweb.Document({
    window,
});
neweb.Component.setDocument(doc);
const value = new rxjs.BehaviorSubject("");
const input = new neweb.InputComponent({
    value,
});
const text = new neweb.Text({
    value,
});
const view = new (class extends neweb.Component {
    beforeMount() {
        this.addElement("txtName", input);
        this.addElement("lblName", text);
    }
    getTemplate() {
        return document.getElementById("template1").innerHTML;
    }
})();
neweb.render(view, document.getElementById("root"));
