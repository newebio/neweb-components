import { Observable } from "rxjs";
import Component from "./Component";
import { addEventListener } from "./dom";
import { isObservable } from "./util";

class Link extends Component<{
    class?: string | Observable<string>;
    href: string | Observable<string>;
    text?: string | Observable<string>;
}> {
    protected href: string;
    protected tagName: keyof HTMLElementTagNameMap = "a";
    public afterInit() {
        const href = this.props.href;
        if (isObservable(href)) {
            const href$ = href as Observable<string>;
            href$.subscribe((value) => this.setHref(value));
        } else {
            this.setHref(href);
        }
        if (isObservable(this.props.text)) {
            this.props.text.subscribe((v) => this.setText(v));
        } else if (this.props.text) {
            this.setText(this.props.text);
        }
        if (isObservable(this.props.class)) {
            this.props.class.subscribe((v) => this.rootElement.setAttribute("class", v));
        } else if (this.props.class) {
            this.rootElement.setAttribute("class", this.props.class);
        }
        addEventListener(this.rootElement, "click", (e) => {
            e.preventDefault();
            history.pushState(this.href, "", this.href);
        }, false);
    }
    public setHref(href: string) {
        this.href = href;
        if (this.tagName.toLowerCase() === "a") {
            (this.rootElement as HTMLAnchorElement).setAttribute("href", this.href);
        }
    }
    public setText(text: string) {
        this.rootElement.innerHTML = text;
    }
}
export default Link;
