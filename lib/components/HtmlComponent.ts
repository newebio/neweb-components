import { Observable } from "rxjs";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";
export interface IHtmlComponent extends IElementComponentProps {
    styles?: {
        [index: string]: any | Observable<any>;
    };
}
class HtmlComponent<T> extends ElementComponent<T> {
    protected rootElement: HTMLElement;
    protected props: IHtmlComponent & T;
    constructor(props?: T & IHtmlComponent) {
        super(props);
    }
    public getRootElement(): HTMLElement {
        return super.getRootElement() as HTMLElement;
    }
    public afterMount() {
        super.afterMount();
        const styles = this.props.styles || {};
        Object.keys(styles).map((styleName) => {
            this.bindStyleToProp(styleName, styles[styleName]);
        });
    }
    protected bindStyleToProp(styleName: string, prop: any) {
        this.addSubscription(prop, (value) => {
            (this.rootElement.style as any)[styleName] = value;
        });
    }
}
export default HtmlComponent;
