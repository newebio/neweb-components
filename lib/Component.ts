import morphdom = require("morphdom");
import { createElement } from "./dom";
import { fromString } from "./template";
class Component<T> {
    protected rootElement: Element;
    protected elements: { [index: string]: Component<any> } = {};
    protected children: Node[];
    protected tagName: keyof HTMLElementTagNameMap;
    protected hasRender = true;
    protected isInited = false;
    // tslint:disable-next-line:variable-name
    protected __neweb_component = true;
    constructor(protected props: T) { }
    public init() {
        if (this.isInited) {
            throw new Error("Component already inited");
        }
        this.isInited = true;
        this.beforeInit();
        const html = this.getTemplate();
        if (html) {
            this.setTemplate(html);
        } else if (!this.rootElement) {
            this.rootElement = this.render();
        }
        this.afterInit();
        (this.getRootElement() as any).onUpdateElement = (newEl: any) => {
            this.rootElement = newEl;
        };
    }
    public setTagName(tagName: keyof HTMLElementTagNameMap) {
        this.tagName = tagName;
    }
    public setChildren(children: Node[]) {
        this.children = children;
    }
    public dispose() {
        Object.keys(this.elements).map((name) => this.elements[name].dispose());
    }
    public getElement(name: string): Component<any> | null {
        if (!(this as any)[name]) {
            return null;
        }
        return (this as any)[name];
    }
    public getElements() {
        return this.elements;
    }
    public getRootElement(): Element {
        return this.rootElement;
    }
    protected getTemplate(): string | undefined {
        return undefined;
    }
    protected setTemplate(html: string) {
        this.rootElement = this.template(html);
    }
    protected addElement<X>(
        name: string,
        element: Component<X>) {
        this.elements[name] = element;
    }
    protected render(): Element {
        const root = createElement(this.tagName);
        if (this.children) {
            this.children.map((child) => root.appendChild(child));
        }
        return root;
    }
    protected beforeInit() {
        //
    }
    protected afterInit() {
        //
    }
    protected template(html: string) {
        return fromString(html, this.getElements());
    }
    protected update() {
        const nextRender = this.render();
        morphdom(this.rootElement, nextRender);
    }
}
export default Component;
