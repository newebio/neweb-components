"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./../util");
const ElementComponent_1 = require("./ElementComponent");
class InputComponent extends ElementComponent_1.default {
    constructor(props) {
        super(props);
    }
    getRootElement() {
        return super.getRootElement();
    }
    afterMount() {
        super.afterMount();
        const listenerFn = () => {
            if (util_1.isObservable(this.props.value)) {
                this.props.value.next(this.rootElement.value);
            }
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.subscribe(this.props.value, (value) => {
            if (value !== this.rootElement.value) {
                this.rootElement.value = value;
            }
        });
    }
}
exports.default = InputComponent;
