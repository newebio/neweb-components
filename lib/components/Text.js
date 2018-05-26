"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./../Component");
class Text extends Component_1.default {
    beforeMount() {
        this.rootElement = this.document.createTextNode("");
        this.subscribe(this.props.value, (text) => this.rootElement.nodeValue = text);
    }
}
exports.default = Text;
