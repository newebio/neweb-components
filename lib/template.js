"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function fromString(document, html, elements) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const htmlElements = div.querySelectorAll("[name]");
    for (const element of htmlElements) {
        const name = element.getAttribute("name");
        const childComponent = elements[name];
        if (!childComponent) {
            throw new Error("Not found property with name " + name);
        }
        replaceElementToComponent(element, childComponent);
    }
    const links = div.querySelectorAll(`[type="neweb-link"]`);
    for (const element of links) {
        element.removeAttribute("type");
        document.addEventListener(element, "click", (e) => {
            e.preventDefault();
            const link = e.target;
            const href = link.getAttribute("href");
            if (link && href) {
                e.preventDefault();
                history.pushState(href, "", href);
            }
        }, false);
    }
    if (div.childNodes.length === 1) {
        return div.childNodes[0];
    }
    return div;
}
exports.fromString = fromString;
function replaceElementToComponent(element, childComponent) {
    childComponent.mount(element);
    const children = childComponent.getRootElement();
    const className = element.getAttribute("class");
    if (className && !children.getAttribute("class")) {
        children.setAttribute("class", className);
    }
    const style = element.getAttribute("style");
    if (style && !children.getAttribute("style")) {
        children.setAttribute("style", style);
    }
    const parent = element.parentElement;
    parent.appendChild(children);
    parent.insertBefore(children, element);
    parent.removeChild(element);
}
exports.replaceElementToComponent = replaceElementToComponent;
