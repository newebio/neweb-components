"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createElement(tagName, options) {
    return document.createElement(tagName, options);
}
exports.createElement = createElement;
function createTextNode(data) {
    return document.createTextNode(data);
}
exports.createTextNode = createTextNode;
function getDocument() {
    return document;
}
exports.getDocument = getDocument;
function addEventListener(el, eventName, listener, bubbles) {
    el._events = el._events || [];
    el._events.push({
        eventName,
        listener,
        bubbles,
    });
    el.addEventListener(eventName, listener, bubbles);
}
exports.addEventListener = addEventListener;
