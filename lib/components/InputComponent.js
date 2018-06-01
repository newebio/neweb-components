"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./../util");
const ElementComponent_1 = require("./ElementComponent");
class InputComponent extends ElementComponent_1.default {
    constructor(props) {
        super(props);
        this.isCheckBox = false;
    }
    getRootElement() {
        return super.getRootElement();
    }
    afterMount() {
        super.afterMount();
        this.isCheckBox = !!this.rootElement.type &&
            this.rootElement.type.toLowerCase() === "checkbox";
        const listenerFn = () => {
            if (util_1.isObservable(this.props.value)) {
                this.props.value.next(this.isCheckBox ?
                    (this.rootElement.checked ?
                        this.rootElement.getAttribute("value") : "")
                    : this.rootElement.value);
            }
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.addSubscription(this.props.value, (value) => {
            if (this.isCheckBox) {
                this.rootElement.checked = !!value;
                return;
            }
            if (value !== this.rootElement.value) {
                this.rootElement.value = value;
            }
        });
    }
}
exports.default = InputComponent;
