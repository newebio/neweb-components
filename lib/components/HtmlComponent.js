"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementComponent_1 = require("./ElementComponent");
class HtmlComponent extends ElementComponent_1.default {
    constructor(props) {
        super(props);
    }
    getRootElement() {
        return super.getRootElement();
    }
    afterMount() {
        super.afterMount();
        const styles = this.props.styles || {};
        Object.keys(styles).map((styleName) => {
            this.bindStyleToProp(styleName, styles[styleName]);
        });
    }
    bindStyleToProp(styleName, prop) {
        this.addSubscription(prop, (value) => {
            this.rootElement.style[styleName] = value;
        });
    }
}
exports.default = HtmlComponent;
