import { Observable } from "rxjs/Observable";
import Component, { IComponentProps } from "./../Component";
import ElementComponent from "./ElementComponent";
export interface IDynamicComponentProps extends IComponentProps {
    component: Component<any> | Observable<Component<any> | undefined> | undefined;
}
class DynamicComponent extends ElementComponent<IDynamicComponentProps> {
    protected currentComponent: Component<any> | undefined;
    constructor(protected props: IDynamicComponentProps) {
        super(props);
    }
    public afterMount() {
        this.addSubscription(this.props.component, this.setComponent);
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
export default DynamicComponent;
