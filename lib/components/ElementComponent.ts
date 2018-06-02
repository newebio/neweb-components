import morphdom = require("morphdom");
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import Component, { IComponentProps } from "./../Component";

export interface IElementComponentProps extends IComponentProps {
    attributes?: { [index: string]: string | Observable<string> };
    events?: {
        [index: string]: ((e: Event) => void) | Subject<any>;
    };
    properties?: { [index: string]: any | Observable<any> };
    innerHTML?: string | Observable<string>;
    tagName?: keyof HTMLElementTagNameMap;
}
class ElementComponent<T> extends Component<{}> {
    protected rootElement: Element;
    protected props: IElementComponentProps & T;
    constructor(props?: T & IElementComponentProps) {
        super(props);
    }
    public getRootElement(): Element {
        return super.getRootElement() as Element;
    }
    protected beforeMount() {
        if (this.props.tagName) {
            this.tagName = this.props.tagName;
        }
    }
    protected afterMount() {
        const events = this.props.events || {};
        const attributes = this.props.attributes || {};
        const properties = this.props.properties || {};

        Object.keys(attributes).map((attrName) => {
            this.bindAttributeToProp(attrName, attributes[attrName]);
        });
        Object.keys(events).map((eventName) => {
            this.bindEventToProp(eventName, events[eventName]);
        });
        Object.keys(properties).map((propertyName) => {
            this.bindPropertyToProp(propertyName, properties[propertyName]);
        });
        if (this.props.innerHTML) {
            this.addSubscription(this.props.innerHTML, (html) => {
                const clonedElement = this.rootElement.cloneNode(false) as Element;
                clonedElement.innerHTML = html;
                morphdom(this.rootElement, clonedElement);
            });
        }
    }
    protected bindAttributeToProp<V extends string>(attrName: string, prop: V | Observable<V>) {
        this.addSubscription(prop, (value) => {
            this.rootElement.setAttribute(attrName, value);
        });
    }
    protected bindInnerHtmlToProp(prop: string | Observable<string>) {
        this.addSubscription(prop, (value) => {
            this.rootElement.innerHTML = value;
        });
    }
    protected bindEventToProp(eventName: string, prop: ((e: any) => any) | Subject<any>) {
        const listenerFn = typeof (prop) === "function" ? prop : (e: Event) => {
            prop.next(e);
        };
        this.document.addEventListener(this.rootElement, eventName, listenerFn, false);
    }
    protected bindPropertyToProp(propertyName: string, prop: any) {
        this.addSubscription(prop, (value) => {
            (this.rootElement as any)[propertyName] = value;
        });
    }
}
export default ElementComponent;
