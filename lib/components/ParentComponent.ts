import { Observable } from "rxjs/Observable";
import Component from "./../Component";
import ElementComponent, { IElementComponentProps } from "./ElementComponent";
export interface IParentComponentProps extends IElementComponentProps {
    child: Component<any> | Observable<Component<any> | undefined> | undefined;
}
class ParentComponent extends ElementComponent<IParentComponentProps> {
    protected currentComponent: Component<any> | undefined;
    constructor(protected props: IParentComponentProps) {
        super(props);
    }
    public afterMount() {
        this.addSubscription(this.props.child, this.setComponent);
    }
    public setComponent = (component: Component<any> | undefined) => {
        const rootElement = this.getRootElement();
        rootElement.innerHTML = "";
        if (this.currentComponent) {
            this.currentComponent.dispose();
        }
        if (component) {
            component.setDocument(this.document);
            component.mount();
            rootElement.appendChild(component.getRootElement());
            this.currentComponent = component;
        } else {
            this.currentComponent = undefined;
        }
    }
}
export default ParentComponent;
