import { Observable } from "rxjs";
import Component from "./Component";

export function isObservable(obj: any): obj is Observable<any> {
    return obj && (typeof (obj.subscribe) === "function");
}
export function isComponent(obj: any): obj is Component<any> {
    return obj && obj.__neweb_component === true;
}
export function nodesToMap(listOfNodes: NodeListOf<Node>) {
    const children: Node[] = [];
    for (const node of listOfNodes) {
        children.push(node);
    }
    return children;
}
export function getElementAttributes(el: Element) {
    const attrs: { [index: string]: string } = {};
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < el.attributes.length; i++) {
        attrs[el.attributes[i].name] = el.attributes[i].value;
    }
    return attrs;
}

export function domNodeToJson(node: Node | Element) {
    const obj: any = {
        nodeType: node.nodeType,
    };
    const element = node as Element;

    if (typeof (element.tagName) !== "undefined") {
        obj.tagName = element.tagName.toLowerCase();
    } else
        if (node.nodeName) {
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
