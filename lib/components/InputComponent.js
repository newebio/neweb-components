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
        const listenerFn = () => {
            if (util_1.isObservable(this.props.value)) {
                const newValue = this.props.format && this.props.format.from ?
                    this.props.format.from(this.rootElement.value) :
                    this.rootElement.value;
                this.props.value.next(newValue);
            }
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.addSubscription(this.props.value, (value) => {
            const newValue = this.props.format && this.props.format.to ?
                this.props.format.to(value) : "" + value;
            if (newValue !== this.rootElement.value) {
                this.rootElement.value = newValue;
            }
        });
    }
}
exports.default = InputComponent;
