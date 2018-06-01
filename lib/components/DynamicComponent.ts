import { Observable } from "rxjs/Observable";
import Component, { IComponentProps } from "./../Component";
import ElementComponent from "./ElementComponent";
export interface IDynamicComponentProps extends IComponentProps {
    component: Component<any> | Observable<Component<any>>;
}
class DynamicComponent extends ElementComponent<IDynamicComponentProps> {
    protected currentComponent: Component<any>;
    constructor(protected props: IDynamicComponentProps) {
        super(props);
    }
    public afterMount() {
        this.addSubscription(this.props.component, this.setComponent);
    }
    public setComponent = (component: Component<any>) => {
        const rootElement = this.getRootElement();
        if (this.currentComponent) {
            rootElement.innerHTML = "";
            this.currentComponent.dispose();
        }
        component.setDocument(this.document);
        component.mount();
        rootElement.appendChild(component.getRootElement());
        this.currentComponent = component;
    }
}
export default DynamicComponent;
