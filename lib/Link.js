"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const dom_1 = require("./dom");
const util_1 = require("./util");
class Link extends Component_1.default {
    constructor() {
        super(...arguments);
        this.tagName = "a";
    }
    afterInit() {
        const href = this.props.href;
        if (util_1.isObservable(href)) {
            const href$ = href;
            href$.subscribe((value) => this.setHref(value));
        }
        else {
            this.setHref(href);
        }
        if (util_1.isObservable(this.props.text)) {
            this.props.text.subscribe((v) => this.setText(v));
        }
        else if (this.props.text) {
            this.setText(this.props.text);
        }
        if (util_1.isObservable(this.props.class)) {
            this.props.class.subscribe((v) => this.rootElement.setAttribute("class", v));
        }
        else if (this.props.class) {
            this.rootElement.setAttribute("class", this.props.class);
        }
        dom_1.addEventListener(this.rootElement, "click", (e) => {
            e.preventDefault();
            history.pushState(this.href, "", this.href);
        }, false);
    }
    setHref(href) {
        this.href = href;
        if (this.tagName.toLowerCase() === "a") {
            this.rootElement.setAttribute("href", this.href);
        }
    }
    setText(text) {
        this.rootElement.innerHTML = text;
    }
}
exports.default = Link;
