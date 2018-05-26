"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Document {
    constructor(config) {
        this.config = config;
        this.document = this.config.window.document;
    }
    createElement(tagName, options) {
        return this.document.createElement(tagName, options);
    }
    createTextNode(data) {
        return this.document.createTextNode(data);
    }
    addEventListener(el, eventName, listener, bubbles) {
        el._events = el._events || [];
        el._events.push({
            eventName,
            listener,
            bubbles,
        });
        el.addEventListener(eventName, listener, bubbles);
    }
    navigate(to, replace = false) {
        if (replace) {
            this.config.window.history.replaceState(to, "", to);
        }
        else {
            this.config.window.history.pushState(to, "", to);
        }
    }
}
exports.default = Document;
