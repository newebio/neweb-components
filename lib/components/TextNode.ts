import { Observable } from "rxjs";
import Component, { IComponentProps } from "./../Component";

export interface ITextProps extends IComponentProps {
    value: Observable<string> | string;
}
class Text extends Component<ITextProps> {
    public beforeMount() {
        this.rootElement = this.document.createTextNode("");
        this.subscribe(this.props.value, (text) => this.rootElement.nodeValue = text);
    }
}
export default Text;
