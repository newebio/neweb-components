"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morphdom = require("morphdom");
const dom_1 = require("./dom");
const template_1 = require("./template");
class Component {
    constructor(props) {
        this.props = props;
        this.elements = {};
        this.hasRender = true;
        this.isInited = false;
        // tslint:disable-next-line:variable-name
        this.__neweb_component = true;
    }
    init() {
        if (this.isInited) {
            throw new Error("Component already inited");
        }
        this.isInited = true;
        this.beforeInit();
        const html = this.getTemplate();
        if (html) {
            this.setTemplate(html);
        }
        else if (!this.rootElement) {
            this.rootElement = this.render();
        }
        this.afterInit();
        this.getRootElement().onUpdateElement = (newEl) => {
            this.rootElement = newEl;
        };
    }
    setTagName(tagName) {
        this.tagName = tagName;
    }
    setChildren(children) {
        this.children = children;
    }
    dispose() {
        Object.keys(this.elements).map((name) => this.elements[name].dispose());
    }
    getElement(name) {
        if (!this[name]) {
            return null;
        }
        return this[name];
    }
    getElements() {
        return this.elements;
    }
    getRootElement() {
        return this.rootElement;
    }
    getTemplate() {
        return undefined;
    }
    setTemplate(html) {
        this.rootElement = this.template(html);
    }
    addElement(name, element) {
        this.elements[name] = element;
    }
    render() {
        const root = dom_1.createElement(this.tagName);
        if (this.children) {
            this.children.map((child) => root.appendChild(child));
        }
        return root;
    }
    beforeInit() {
        //
    }
    afterInit() {
        //
    }
    template(html) {
        return template_1.fromString(html, this.getElements());
    }
    update() {
        const nextRender = this.render();
        morphdom(this.rootElement, nextRender);
    }
}
exports.default = Component;
