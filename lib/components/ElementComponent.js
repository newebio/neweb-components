"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morphdom = require("morphdom");
const Component_1 = require("./../Component");
class ElementComponent extends Component_1.default {
    constructor(props) {
        super(props);
    }
    getRootElement() {
        return super.getRootElement();
    }
    beforeMount() {
        if (this.props.tagName) {
            this.tagName = this.props.tagName;
        }
    }
    afterMount() {
        const events = this.props.events || {};
        const attributes = this.props.attributes || {};
        Object.keys(attributes).map((attrName) => {
            this.bindAttributeToProp(attrName, attributes[attrName]);
        });
        Object.keys(events).map((eventName) => {
            this.bindEventToProp(eventName, events[eventName]);
        });
        if (this.props.innerHTML) {
            this.subscribe(this.props.innerHTML, (html) => {
                const clonedElement = this.rootElement.cloneNode(false);
                clonedElement.innerHTML = html;
                morphdom(this.rootElement, clonedElement);
            });
        }
    }
    bindAttributeToProp(attrName, prop) {
        this.subscribe(prop, (value) => {
            this.rootElement.setAttribute(attrName, value);
        });
    }
    bindInnerHtmlToProp(prop) {
        this.subscribe(prop, (value) => {
            this.rootElement.innerHTML = value;
        });
    }
    bindEventToProp(eventName, prop) {
        const listenerFn = typeof (prop) === "function" ? prop : (e) => {
            prop.next(e);
        };
        this.document.addEventListener(this.rootElement, eventName, listenerFn, false);
    }
}
exports.default = ElementComponent;
