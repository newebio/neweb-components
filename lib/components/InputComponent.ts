import { Subject } from "rxjs/Subject";
import { isObservable } from "./../util";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";

export type BaseTypes = string | number | boolean | object | null | undefined;

export interface IInputComponentProps extends IElementComponentProps {
    value: BaseTypes | Subject<BaseTypes>;
    format?: {
        to?: (value: any) => string;
        from?: (value: string) => any;
    };
}
class InputComponent extends ElementComponent<IInputComponentProps> {
    protected rootElement: HTMLInputElement;
    protected props: IInputComponentProps;
    protected isCheckBox = false;
    protected oldValue: any;
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
                const newValue = this.props.format && this.props.format.from ?
                    this.props.format.from(this.rootElement.value) :
                    this.rootElement.value;
                if (this.oldValue !== newValue) {
                    this.props.value.next(newValue);
                    this.oldValue = newValue;
                }
            }
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.addSubscription(this.props.value, (value) => {
            const newValue = this.props.format && this.props.format.to ?
                this.props.format.to(value) : "" + value;
            if (newValue !== this.rootElement.value) {
                this.rootElement.value = newValue;
                this.oldValue = newValue;
            }
        });
    }
}
export default InputComponent;
