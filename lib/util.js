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
function nodesToMap(listOfNodes) {
    const children = [];
    for (const node of listOfNodes) {
        children.push(node);
    }
    return children;
}
exports.nodesToMap = nodesToMap;
function getElementAttributes(el) {
    const attrs = {};
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < el.attributes.length; i++) {
        attrs[el.attributes[i].name] = el.attributes[i].value;
    }
    return attrs;
}
exports.getElementAttributes = getElementAttributes;
function domNodeToJson(node) {
    const obj = {
        nodeType: node.nodeType,
    };
    const element = node;
    if (typeof (element.tagName) !== "undefined") {
        obj.tagName = element.tagName.toLowerCase();
    }
    else if (node.nodeName) {
        obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
        obj.nodeValue = node.nodeValue;
    }
    if (element.attributes) {
        obj.attributes = {};
        const attrs = element.attributes;
        if (attrs) {
            for (let i = 0; i < length; i++) {
                const attr = attrs[i];
                obj.attributes[attr.nodeName] = attr.nodeValue;
            }
        }
    }
    const childNodes = node.childNodes;
    if (childNodes && childNodes.length > 0) {
        obj.childNodes = [];
        const length = childNodes.length;
        for (let i = 0; i < length; i++) {
            obj.childNodes[i] = domNodeToJson(childNodes[i]);
        }
    }
    return obj;
}
exports.domNodeToJson = domNodeToJson;
