import { Observable } from "rxjs/Observable";
import { isComponent, isObservable } from "./../util";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";

export interface IListProps<T> extends IElementComponentProps {
    items: T[] | Observable<T[]>;
    renderItem?: (item: T, index: number) => Element | ElementComponent<any> | string;
    class?: string;
}
class List<T> extends ElementComponent<IElementComponentProps> {
    protected items: T[];
    protected tagName: keyof HTMLElementTagNameMap = "ul";
    protected childNode?: Element;
    constructor(protected props: IListProps<T>) {
        super(props);
    }
    public mount(elForMount?: Element) {
        if (elForMount) {
            this.saveMountElement(elForMount);
        }
        const childrenElements = this.children ? this.children.filter((n) => n.nodeType === 1) : [];
        this.childNode = childrenElements.length === 1 ? childrenElements[0] as Element : undefined;
        if (this.props.renderItem) {
            this.renderItem = this.props.renderItem;
        } else if (childrenElements.length === 1) {
            const node = childrenElements[0] as Element;
            this.renderItem = (item: T) => {
                const child = this.document.createElement(node.tagName as any);
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
        if (isObservable(this.props.items)) {
            this.props.items.subscribe((items) => {
                const oldItems = this.items;
                this.items = items;
                if (oldItems) {
                    this.update();
                }
            });
        } else {
            this.items = this.props.items;
        }
        super.mount();
    }
    protected afterMount() {
        const rootElement = this.getRootElement();
        if (this.props.class) {
            rootElement.className = this.props.class;
        }
    }
    protected clone() {
        const root = document.createElement(this.rootElement.tagName);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.rootElement.attributes.length; i++) {
            root.setAttribute(this.rootElement.attributes[i].name, this.rootElement.attributes[i].value);
        }
        return root as Element;
    }
    protected render() {
        const ul = this.rootElement ? this.clone() : this.document.createElement(this.tagName);
        this.items.map((item, index) => {
            const child = this.renderItem(item as any, index);
            if (isComponent(child)) {
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
            } else if (typeof (child) === "string") {
                ul.appendChild(this.createElementfromTemplate(child));
            } else {
                ul.appendChild(child);
            }
        });
        return ul;
    }
    protected renderItem(item: T, _: number): Element | ElementComponent<any> | string {
        const li = this.document.createElement("li");
        li.innerHTML = item as any;
        return li;
    }
}
export default List;
