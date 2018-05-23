import { Observable } from "rxjs";
import Component from "./Component";
import { createElement } from "./dom";
import { nodesToMap } from "./template";
import { isComponent, isObservable } from "./util";

export interface IListConfig<T> {
    items: T[] | Observable<T[]>;
    rootTag?: keyof HTMLElementTagNameMap;
    renderItem?: (item: T, index: number) => Element | Component<any> | string;
    class?: string;
}
class List<T> extends Component<IListConfig<T>> {
    protected items: T[];
    protected rootTag: keyof HTMLElementTagNameMap = "ul";
    protected childNode?: Element;
    protected beforeInit() {
        if (this.props.rootTag) {
            this.rootTag = this.props.rootTag;
        }
        const childrenElements = this.children.filter((n) => n.nodeType === 1);
        this.childNode = childrenElements.length === 1 ? childrenElements[0] as Element : undefined;
        if (this.props.renderItem) {
            this.renderItem = this.props.renderItem;
        } else if (childrenElements.length === 1) {
            const node = childrenElements[0] as Element;
            this.renderItem = (item: T) => {
                const child = createElement(node.tagName as any);
                child.setAttribute("class", node.getAttribute("class"));
                child.setAttribute("style", node.getAttribute("style"));
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
    }
    protected afterInit() {
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
        const ul = this.rootElement ? this.clone() : createElement(this.rootTag);
        this.items.map((item, index) => {
            const child = this.renderItem(item as any, index);
            if (isComponent(child)) {
                if (this.childNode) {
                    child.setTagName(this.childNode.tagName as any);
                    child.setChildren(nodesToMap(this.childNode.childNodes));
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
            } else if (typeof (child) === "string") {
                ul.appendChild(this.template(child));
            } else {
                ul.appendChild(child);
            }
        });
        return ul;
    }
    protected renderItem(item: T, _: number): Element | Component<any> | string {
        const li = createElement("li");
        li.innerHTML = item as any;
        return li;
    }
}
export default List;
