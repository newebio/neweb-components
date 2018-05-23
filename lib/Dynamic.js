"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = require("./Component");
const util_1 = require("./util");
class Dynamic extends Component_1.default {
    afterInit() {
        const component = this.props.component;
        if (util_1.isObservable(component)) {
            const component$ = component;
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
        }
        else {
            component.init();
            this.rootElement.appendChild(component.getRootElement());
            this.currentComponent = component;
        }
    }
}
exports.default = Dynamic;
