"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("./dom");
function fromString(html, elements) {
    const div = dom_1.createElement("div");
    div.innerHTML = html;
    const htmlElements = div.querySelectorAll("[name]");
    for (const element of htmlElements) {
        const name = element.getAttribute("name");
        const childComponent = elements[name];
        if (!childComponent) {
            throw new Error("Not found property with name " + name);
        }
        childComponent.setTagName(element.tagName);
        childComponent.setChildren(nodesToMap(element.childNodes));
        childComponent.init();
        const children = childComponent.getRootElement();
        const className = element.getAttribute("class");
        if (className) {
            children.setAttribute("class", className);
        }
        const style = element.getAttribute("style");
        if (style) {
            children.setAttribute("style", style);
        }
        const parent = element.parentElement;
        parent.appendChild(children);
        parent.insertBefore(children, element);
        parent.removeChild(element);
    }
    if (div.childNodes.length === 1) {
        return div.childNodes[0];
    }
    return div;
}
exports.fromString = fromString;
function nodesToMap(listOfNodes) {
    const children = [];
    for (const node of listOfNodes) {
        children.push(node);
    }
    return children;
}
exports.nodesToMap = nodesToMap;
