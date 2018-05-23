"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isObservable(obj) {
    return obj && (typeof (obj.subscribe) === "function");
}
exports.isObservable = isObservable;
function isComponent(obj) {
    return obj && obj.__neweb_component === true;
}
exports.isComponent = isComponent;
