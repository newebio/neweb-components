import { Observable } from "rxjs";
import Component from "./Component";
import { createElement, createTextNode } from "./dom";
import { isObservable } from "./util";

export interface ITextConfig {
    value: Observable<string> | string;
}
class Text extends Component<ITextConfig> {
    protected isTextNode = true;
    public beforeInit() {
        this.isTextNode = !(this.tagName && this.tagName.toLowerCase() !== "element");
        this.rootElement = this.isTextNode ? createTextNode("") : createElement(this.tagName) as any;
        const value = this.props.value;
        if (isObservable(value)) {
            value.subscribe((v) => {
                this.setValue(v);
            });
        } else {
            this.setValue(value);
        }
    }
    protected setValue(text: string) {
        if (this.isTextNode) {
            this.getRootElement().nodeValue = text;
        } else {
            this.getRootElement().innerHTML = text;
        }
    }
}
export default Text;
