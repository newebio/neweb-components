import { Subject } from "rxjs/Subject";
import { isObservable } from "./../util";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";

export interface IInputComponentProps extends IElementComponentProps {
    value: string | Subject<string>;
}
class InputComponent extends ElementComponent<IInputComponentProps> {
    protected rootElement: HTMLInputElement;
    protected props: IInputComponentProps;
    protected isCheckBox = false;
    constructor(props?: IInputComponentProps) {
        super(props);
    }
    public getRootElement() {
        return super.getRootElement() as HTMLInputElement;
    }
    protected afterMount() {
        super.afterMount();
        const listenerFn = () => {
            if (isObservable(this.props.value)) {
                this.props.value.next(this.rootElement.value);
            }
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.addSubscription(this.props.value, (value) => {
            if (value !== this.rootElement.value) {
                this.rootElement.value = value;
            }
        });
    }
}
export default InputComponent;
