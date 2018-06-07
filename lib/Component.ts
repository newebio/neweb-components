import morphdom = require("morphdom");
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import Document from "./Document";
import { fromString } from "./template";
import { getElementAttributes, isObservable, nodesToMap } from "./util";

export interface IComponentProps {
    document?: Document;
    template?: string;
    inherit?: Component<any>;
}
class Component<T> {
    public static setDocument(document: Document) {
        Component.document = document;
    }
    protected static document?: Document;
    protected rootElement: Node;
    protected elements: { [index: string]: Component<any> } = {};
    protected children: Node[];
    protected tagName: keyof HTMLElementTagNameMap;
    protected mountAttributes: { [index: string]: string };
    protected hasRender = true;
    protected isMounted = false;
    // Special var for check isComponent
    // tslint:disable-next-line:variable-name
    protected __neweb_component = true;
    protected subscriptions: Subscription[] = [];
    protected documentValue: Document;
    protected props: T & IComponentProps;
    constructor(props?: T & IComponentProps) {
        this.props = props ? props : {} as any;
        if (this.props.document) {
            this.documentValue = this.props.document;
        } else if (Component.document) {
            this.documentValue = Component.document;
        }
    }
    public get document() {
        if (!this.documentValue) {
            if (typeof (window) !== "undefined" && window.window === window) {
                this.documentValue = new Document({ window });
            } else {
                throw new Error("Document should be setted");
            }
        }
        return this.documentValue;
    }
    public setDocument(document: Document) {
        this.documentValue = document;
    }
    public mount(elForMount?: Element) {
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
        if (this.props.inherit) {
            this.props.inherit.mount();
            this.rootElement = this.props.inherit.getRootElement();
        } else {
            // from template
            const html = this.props.template ? this.props.template : this.getTemplate();
            if (html) {
                this.setRootElementByTemplate(html);
            } else if (!this.rootElement) {
                // from render
                this.rootElement = this.render();
            }
        }
        this.afterMount();
        // method for replace root element for hydrate
        (this.getRootElement() as any).onUpdateElement = (newEl: any) => {
            this.rootElement = newEl;
        };
        (this.rootElement as any).$component = this;
    }
    /**
     * Method for clean resources
     */
    public dispose() {
        // unsubscribe for all subscriptions
        this.subscriptions.map((subscription) => subscription.unsubscribe);
        // dispose all children elements
        Object.keys(this.elements).map((name) => this.elements[name].dispose());
        delete (this.rootElement as any).$component;
    }
    /**
     * Children elements
     */
    public getElements() {
        return this.elements;
    }
    /**
     * Root element
     */
    public getRootElement(): Node {
        return this.rootElement;
    }
    protected saveMountElement(elForMount: Element) {
        this.tagName = elForMount.tagName as any;
        this.children = nodesToMap(elForMount.childNodes);
        this.mountAttributes = getElementAttributes(elForMount);
    }
    protected setTemplate(html: string) {
        this.props.template = html;
    }
    protected getTemplate(): string | undefined {
        return undefined;
    }
    /**
     * Create root element by template
     */
    protected setRootElementByTemplate(html: string) {
        this.rootElement = this.createElementfromTemplate(html);
    }
    /**
     * Add child element
     * @param name Name of element inside component
     * @param element any Component
     */
    protected addElement(
        name: string,
        element: Component<any>) {
        if (this.elements[name]) {
            throw new Error("Element with name " + name + " already existing");
        }
        this.elements[name] = element;
    }
    /**
     * Method for creating the component's dom
     */
    protected render(): Element {
        // Create new element by current tagName, default `div`
        const root = this.document.createElement(this.tagName ? this.tagName as any : "div");
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
    protected beforeMount() {
        //
    }
    /**
     * Hook for work with root-element, like events
     */
    protected afterMount() {
        //
    }
    /**
     * Hook before dispose
     */
    protected beforeDispose() {
        //
    }
    /**
     * Hook after dispose
     */
    protected afterDispose() {
        //
    }
    /**
     * Create dom from html-string and children elements
     * @param html any html
     */
    protected createElementfromTemplate(html: string) {
        return fromString(this.document, html, this.getElements());
    }
    /**
     * Update component's dom-tree by new render
     */
    protected update() {
        morphdom(this.rootElement, this.render());
    }
    /**
     * Subscribe properties by primitive value of Observable
     */
    protected addSubscription<V>(value: V | Observable<V>, observer: (value: V) => void) {
        if (isObservable(value)) {
            this.subscriptions.push(value.subscribe(observer));
        } else {
            observer(value);
        }
    }
}
export default Component;
