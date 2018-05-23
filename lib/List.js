"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const dom_1 = require("./dom");
const template_1 = require("./template");
const util_1 = require("./util");
class List extends Component_1.default {
    constructor() {
        super(...arguments);
        this.rootTag = "ul";
    }
    beforeInit() {
        if (this.props.rootTag) {
            this.rootTag = this.props.rootTag;
        }
        const childrenElements = this.children.filter((n) => n.nodeType === 1);
        this.childNode = childrenElements.length === 1 ? childrenElements[0] : undefined;
        if (this.props.renderItem) {
            this.renderItem = this.props.renderItem;
        }
        else if (childrenElements.length === 1) {
            const node = childrenElements[0];
            this.renderItem = (item) => {
                const child = dom_1.createElement(node.tagName);
                child.setAttribute("class", node.getAttribute("class"));
                child.setAttribute("style", node.getAttribute("style"));
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
    }
    afterInit() {
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
        const ul = this.rootElement ? this.clone() : dom_1.createElement(this.rootTag);
        this.items.map((item, index) => {
            const child = this.renderItem(item, index);
            if (util_1.isComponent(child)) {
                if (this.childNode) {
                    child.setTagName(this.childNode.tagName);
                    child.setChildren(template_1.nodesToMap(this.childNode.childNodes));
                }
                child.init();
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
                ul.appendChild(this.template(child));
            }
            else {
                ul.appendChild(child);
            }
        });
        return ul;
    }
    renderItem(item, _) {
        const li = dom_1.createElement("li");
        li.innerHTML = item;
        return li;
    }
}
exports.default = List;
