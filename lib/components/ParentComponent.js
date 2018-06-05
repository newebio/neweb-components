"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementComponent_1 = require("./ElementComponent");
class ParentComponent extends ElementComponent_1.default {
    constructor(props) {
        super(props);
        this.props = props;
        this.setComponent = (component) => {
            const rootElement = this.getRootElement();
            rootElement.innerHTML = "";
            if (this.currentComponent) {
                this.currentComponent.dispose();
            }
            if (component) {
                component.setDocument(this.document);
                component.mount();
                rootElement.appendChild(component.getRootElement());
                this.currentComponent = component;
            }
            else {
                this.currentComponent = undefined;
            }
        };
    }
    afterMount() {
        this.addSubscription(this.props.child, this.setComponent);
    }
}
exports.default = ParentComponent;
