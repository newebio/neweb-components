import * as Rx from "rxjs";
import * as Neweb from "./../../../";
declare var neweb: typeof Neweb;
declare var rxjs: typeof Rx;
const doc = new neweb.Document({
    window,
});
neweb.Component.setDocument(doc);
const value = new rxjs.BehaviorSubject<string>("");
const input = new neweb.InputComponent({
    value,
});
const text = new neweb.TextNode({
    value,
});

const view = new (class extends neweb.Component<{}> {
    beforeMount() {
        this.addElement("txtName", input);
        this.addElement("lblName", text);
    }
    getTemplate() {
        return (document.getElementById("template1") as HTMLElement).innerHTML;
    }
})();

neweb.render(view, document.getElementById("root") as HTMLElement);
