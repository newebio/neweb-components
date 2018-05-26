import { Subject } from "rxjs";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";

export interface IInputComponentProps extends IElementComponentProps {
    value?: Subject<string>;
}
class InputComponent extends ElementComponent {
    public value: Subject<string>;
    protected rootElement: HTMLInputElement;
    protected props: IInputComponentProps;
    constructor(props?: IInputComponentProps) {
        super(props);
    }
    public getRootElement() {
        return super.getRootElement() as HTMLInputElement;
    }
    protected afterMount() {
        super.afterMount();
        this.value = this.props.value ? this.props.value : new Subject<string>();
        const listenerFn = () => {
            this.value.next(this.rootElement.value);
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.value.subscribe((value) => {
            if (value !== this.rootElement.value) {
                this.rootElement.value = value;
            }
        });
    }
}
export default InputComponent;
