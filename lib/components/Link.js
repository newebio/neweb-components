"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementComponent_1 = require("./ElementComponent");
class Link extends ElementComponent_1.default {
    constructor(props) {
        super(props);
        this.props = props;
        this.tagName = "a";
    }
    afterMount() {
        super.afterMount();
        this.addSubscription(this.props.url, (url) => {
            this.url = url;
            if (this.rootElement.tagName.toLowerCase() === "a") {
                this.rootElement.setAttribute("href", this.url);
            }
        });
        this.document.addEventListener(this.rootElement, "click", (e) => {
            e.preventDefault();
            this.document.navigate(this.url, !!this.props.replace);
        }, false);
    }
}
exports.Link = Link;
exports.default = Link;
