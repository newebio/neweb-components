"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const dom_1 = require("./dom");
const util_1 = require("./util");
class Text extends Component_1.default {
    constructor() {
        super(...arguments);
        this.isTextNode = true;
    }
    beforeInit() {
        this.isTextNode = !(this.tagName && this.tagName.toLowerCase() !== "element");
        this.rootElement = this.isTextNode ? dom_1.createTextNode("") : dom_1.createElement(this.tagName);
        const value = this.props.value;
        if (util_1.isObservable(value)) {
            value.subscribe((v) => {
                this.setValue(v);
            });
        }
        else {
            this.setValue(value);
        }
    }
    setValue(text) {
        if (this.isTextNode) {
            this.getRootElement().nodeValue = text;
        }
        else {
            this.getRootElement().innerHTML = text;
        }
    }
}
exports.default = Text;
