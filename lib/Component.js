"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const morphdom = require("morphdom");
const rxjs_1 = require("rxjs");
const template_1 = require("./template");
const util_1 = require("./util");
class Component {
    constructor(props) {
        this.elements = {};
        this.hasRender = true;
        this.isMounted = false;
        // Special var for check isComponent
        // tslint:disable-next-line:variable-name
        this.__neweb_component = true;
        this.subscriptions = [];
        this.props = props ? props : {};
        if (this.props.document) {
            this.documentValue = this.props.document;
        }
        else if (Component.document) {
            this.documentValue = Component.document;
        }
    }
    static setDocument(document) {
        Component.document = document;
    }
    get document() {
        if (!this.documentValue) {
            throw new Error("Document should be setted");
        }
        return this.documentValue;
    }
    setDocument(document) {
        this.documentValue = document;
    }
    mount(elForMount) {
        // check if mounted
        if (this.isMounted) {
            throw new Error("Component already inited");
        }
        this.isMounted = true;
        // set mounted props
        if (elForMount) {
            this.saveMountElement(elForMount);
        }
        //
        this.beforeMount();
        // create root element
        // from template
        const html = this.props.template ? this.props.template : this.getTemplate();
        if (html) {
            this.setRootElementByTemplate(html);
        }
        else if (!this.rootElement) {
            // from render
            this.rootElement = this.render();
        }
        this.afterMount();
        // method for replace root element for hydrate
        this.getRootElement().onUpdateElement = (newEl) => {
            this.rootElement = newEl;
        };
    }
    /**
     * Method for clean resources
     */
    dispose() {
        // unsubscribe for all subscriptions
        this.subscriptions.map((subscription) => subscription.unsubscribe);
        // dispose all children elements
        Object.keys(this.elements).map((name) => this.elements[name].dispose());
    }
    /**
     * Children elements
     */
    getElements() {
        return this.elements;
    }
    /**
     * Root element
     */
    getRootElement() {
        return this.rootElement;
    }
    saveMountElement(elForMount) {
        this.tagName = elForMount.tagName;
        this.children = util_1.nodesToMap(elForMount.childNodes);
        this.mountAttributes = util_1.getElementAttributes(elForMount);
    }
    getTemplate() {
        return undefined;
    }
    /**
     * Create root element by template
     */
    setRootElementByTemplate(html) {
        this.rootElement = this.createElementfromTemplate(html);
    }
    /**
     * Add child element
     * @param name Name of element inside component
     * @param element any Component
     */
    addElement(name, element) {
        if (this.elements[name]) {
            throw new Error("Element with name " + name + " already existing");
        }
        this.elements[name] = element;
    }
    /**
     * Method for creating the component's dom
     */
    render() {
        // Create new element by current tagName, default `div`
        const root = this.document.createElement(this.tagName ? this.tagName : "div");
        // if component has children dom-elements, add it
        if (this.children) {
            this.children.map((child) => root.appendChild(child));
        }
        // copy all mount attrs
        if (this.mountAttributes) {
            Object.keys(this.mountAttributes).map((attrName) => {
                root.setAttribute(attrName, this.mountAttributes[attrName]);
            });
        }
        return root;
    }
    /**
     * Hook for adding children elements and set other properties for render
     */
    beforeMount() {
        //
    }
    /**
     * Hook for work with root-element, like events
     */
    afterMount() {
        //
    }
    /**
     * Hook before dispose
     */
    beforeDispose() {
        //
    }
    /**
     * Hook after dispose
     */
    afterDispose() {
        //
    }
    /**
     * Create dom from html-string and children elements
     * @param html any html
     */
    createElementfromTemplate(html) {
        return template_1.fromString(this.document, html, this.getElements());
    }
    /**
     * Update component's dom-tree by new render
     */
    update() {
        morphdom(this.rootElement, this.render());
    }
    /**
     * Subscribe properties by primitive value of Observable
     */
    subscribe(value, observer) {
        if (rxjs_1.isObservable(value)) {
            this.subscriptions.push(value.subscribe(observer));
        }
        else {
            observer(value);
        }
    }
}
exports.default = Component;
