import { Observable } from "rxjs";
import Component from "./Component";
import { isObservable } from "./util";

class Dynamic extends Component<{
    component: Component<any> | Observable<Component<any>>;
}> {
    protected currentComponent: Component<any>;
    public afterInit() {
        const component = this.props.component;
        if (isObservable(component)) {
            const component$ = component as Observable<any>;
            component$.subscribe((childComponent) => {
                const rootElement = this.getRootElement();
                if (this.currentComponent) {
                    rootElement.innerHTML = "";
                    this.currentComponent.dispose();
                }
                childComponent.init();
                rootElement.appendChild(childComponent.getRootElement());
                this.currentComponent = childComponent;
            });
        } else {
            component.init();
            this.rootElement.appendChild(component.getRootElement());
            this.currentComponent = component;
        }
    }
}
export default Dynamic;
