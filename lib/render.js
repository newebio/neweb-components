"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function render(el, to) {
    el.mount();
    to.appendChild(el.getRootElement());
}
exports.render = render;
function replace(el, to) {
    to.innerHTML = "";
    el.mount();
    to.appendChild(el.getRootElement());
}
exports.replace = replace;
function hydrate(el, to) {
    el.mount();
    const root = to.childNodes[0];
    to.replaceChild(el.getRootElement(), root);
    // TODO: MAKE REAL HYDRATE
}
exports.hydrate = hydrate;
