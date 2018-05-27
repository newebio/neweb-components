import { Observable } from "rxjs";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";
export interface ILinkProps extends IElementComponentProps {
    url: string | Observable<string>;
    replace?: boolean;
}
export class Link extends ElementComponent<ILinkProps> {
    protected tagName: keyof HTMLElementTagNameMap = "a";
    protected url: string;
    constructor(protected props: ILinkProps) {
        super(props);
    }
    public afterMount() {
        super.afterMount();
        this.addSubscription(this.props.url, (url) => {
            this.url = url;
            if (this.rootElement.tagName.toLowerCase() === "a") {
                this.rootElement.setAttribute("href", this.url);
            }
        });
        this.document.addEventListener(this.rootElement, "click", (e) => {
            e.preventDefault();
            this.document.navigate(this.url, !!this.props.replace);
        }, false);
    }
}
export default Link;
