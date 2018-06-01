import { Subject } from "rxjs";
import { isObservable } from "./../util";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";

export interface IBooleanInputComponentProps extends IElementComponentProps {
    value: boolean | Subject<boolean>;
}
class BooleanInputComponent extends ElementComponent<IBooleanInputComponentProps> {
    protected props: IBooleanInputComponentProps;
    protected isCheckBox = false;
    protected rootElement: HTMLInputElement;
    protected tagName = "input" as "input";
    constructor(props?: IBooleanInputComponentProps) {
        super(props);
    }
    public getRootElement() {
        return super.getRootElement() as HTMLInputElement;
    }
    protected afterMount() {
        super.afterMount();
        this.isCheckBox = !!this.rootElement.type &&
            this.rootElement.type.toLowerCase() === "checkbox";
        const listenerFn = () => {

            if (isObservable(this.props.value)) {
                this.props.value.next(this.isCheckBox ? this.rootElement.checked :
                    !!this.rootElement.value);
            }
        };
        this.document.addEventListener(this.rootElement, "change", listenerFn, false);
        this.document.addEventListener(this.rootElement, "input", listenerFn, false);
        this.addSubscription(this.props.value, (value) => {
            if (this.isCheckBox) {
                this.rootElement.checked = value;
            }
        });
    }
}
export default BooleanInputComponent;
