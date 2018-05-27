"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementComponent_1 = require("./ElementComponent");
class DynamicComponent extends ElementComponent_1.default {
    constructor(props) {
        super(props);
        this.props = props;
        this.setComponent = (component) => {
            const rootElement = this.getRootElement();
            if (this.currentComponent) {
                rootElement.innerHTML = "";
                this.currentComponent.dispose();
            }
            component.setDocument(this.document);
            component.mount();
            rootElement.appendChild(component.getRootElement());
            this.currentComponent = component;
        };
    }
    afterMount() {
        this.addSubscription(this.props.component, this.setComponent);
    }
}
exports.default = DynamicComponent;
