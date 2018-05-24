import Component from "./Component";
import { addEventListener, createElement } from "./dom";

export function fromString(html: string, elements: { [index: string]: Component<any> }): HTMLElement {
    const div = createElement("div");
    div.innerHTML = html;
    const htmlElements = div.querySelectorAll("[name]") as NodeListOf<HTMLElement>;
    for (const element of htmlElements) {
        const name = element.getAttribute("name") as string;
        const childComponent = elements[name];
        if (!childComponent) {
            throw new Error("Not found property with name " + name);
        }
        replaceElementToComponent(element, childComponent);
    }
    const links = div.querySelectorAll(`[type="neweb-link"]`) as NodeListOf<HTMLElement>;
    for (const element of links) {
        element.removeAttribute("type");
        addEventListener(element, "click", (e) => {
            e.preventDefault();
            const link = e.target as Element;
            const href = link.getAttribute("href");
            if (link && href) {
                e.preventDefault();
                history.pushState(href, "", href);
            }
        }, false);
    }
    if (div.childNodes.length === 1) {
        return div.childNodes[0] as HTMLElement;
    }
    return div;
}
export function replaceElementToComponent(element: Element, childComponent: Component<any>) {
    childComponent.setTagName(element.tagName as any);
    childComponent.setChildren(nodesToMap(element.childNodes));
    childComponent.init();
    const children = childComponent.getRootElement() as HTMLElement;
    const className = element.getAttribute("class");
    if (className) {
        children.setAttribute("class", className);
    }
    const style = element.getAttribute("style");
    if (style) {
        children.setAttribute("style", style);
    }
    const parent = (element.parentElement as HTMLElement);
    parent.appendChild(children);
    parent.insertBefore(children, element);
    parent.removeChild(element);
}
export function nodesToMap(listOfNodes: NodeListOf<Node>) {
    const children: Node[] = [];
    for (const node of listOfNodes) {
        children.push(node);
    }
    return children;
}
