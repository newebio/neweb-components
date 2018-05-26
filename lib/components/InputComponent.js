"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
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
        this.value = this.props.value ? this.props.value : new rxjs_1.Subject();
        const listenerFn = () => {
            this.value.next(this.rootElement.value);
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.value.subscribe((value) => {
            if (value !== this.rootElement.value) {
                this.rootElement.value = value;
            }
        });
    }
}
exports.default = InputComponent;
