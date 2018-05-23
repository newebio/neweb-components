"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morphdom = require("morphdom");
function render(el, to) {
    el.init();
    to.appendChild(el.getRootElement());
}
exports.render = render;
function replace(el, to) {
    to.innerHTML = "";
    el.init();
    to.appendChild(el.getRootElement());
}
exports.replace = replace;
function hydrate(el, to) {
    el.init();
    const root = to.childNodes[0];
    morphdom(root, el.getRootElement(), {
        onBeforeElUpdated: (oldEl, newEl) => {
            if (newEl._events) {
                newEl._events.map((event) => {
                    oldEl.addEventListener(event.eventName, event.listener, event.bubbles);
                });
            }
            if (newEl.onUpdateElement) {
                newEl.onUpdateElement(oldEl);
            }
        },
    });
}
exports.hydrate = hydrate;
