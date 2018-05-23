import { Observable } from "rxjs";
import Component from "./Component";

class Image extends Component<{
    source: string | Observable<string>;
}> {
    protected rootElement: HTMLImageElement;
    protected tagName = "img" as any;
    public afterInit() {
        const source = this.props.source;
        if (source instanceof Observable) {
            source.subscribe((src) => {
                this.rootElement.setAttribute("src", src);
            });
        } else {
            this.rootElement.setAttribute("src", source);
        }
    }
}
export default Image;
