"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./../util");
const ElementComponent_1 = require("./ElementComponent");
class List extends ElementComponent_1.default {
    constructor(props) {
        super(props);
        this.props = props;
        this.tagName = "ul";
    }
    mount(elForMount) {
        if (elForMount) {
            this.saveMountElement(elForMount);
        }
        const childrenElements = this.children ? this.children.filter((n) => n.nodeType === 1) : [];
        this.childNode = childrenElements.length === 1 ? childrenElements[0] : undefined;
        if (this.props.renderItem) {
            this.renderItem = this.props.renderItem;
        }
        else if (childrenElements.length === 1) {
            const node = childrenElements[0];
            this.renderItem = (item) => {
                const child = this.document.createElement(node.tagName);
                if (node.getAttribute("class")) {
                    child.setAttribute("class", node.getAttribute("class"));
                }
                if (node.getAttribute("style")) {
                    child.setAttribute("style", node.getAttribute("style"));
                }
                child.innerHTML = item;
                return child;
            };
        }
        if (util_1.isObservable(this.props.items)) {
            this.props.items.subscribe((items) => {
                const oldItems = this.items;
                this.items = items;
                if (oldItems) {
                    this.update();
                }
            });
        }
        else {
            this.items = this.props.items;
        }
        super.mount();
    }
    afterMount() {
        const rootElement = this.getRootElement();
        if (this.props.class) {
            rootElement.className = this.props.class;
        }
    }
    clone() {
        const root = document.createElement(this.rootElement.tagName);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.rootElement.attributes.length; i++) {
            root.setAttribute(this.rootElement.attributes[i].name, this.rootElement.attributes[i].value);
        }
        return root;
    }
    render() {
        const ul = this.rootElement ? this.clone() : this.document.createElement(this.tagName);
        this.items.map((item, index) => {
            const child = this.renderItem(item, index);
            if (util_1.isComponent(child)) {
                child.setDocument(this.document);
                child.mount(this.childNode);
                if (this.childNode) {
                    const className = this.childNode.getAttribute("class");
                    if (className) {
                        child.getRootElement().setAttribute("class", className);
                    }
                    const style = this.childNode.getAttribute("style");
                    if (style) {
                        child.getRootElement().setAttribute("style", style);
                    }
                }
                ul.appendChild(child.getRootElement());
            }
            else if (typeof (child) === "string") {
                ul.appendChild(this.createElementfromTemplate(child));
            }
            else {
                ul.appendChild(child);
            }
        });
        return ul;
    }
    renderItem(item, _) {
        const li = this.document.createElement("li");
        li.innerHTML = item;
        return li;
    }
}
exports.default = List;
