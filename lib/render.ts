import morphdom = require("morphdom");
import Component from "./Component";

export function render(el: Component<any>, to: HTMLElement) {
    el.mount();
    to.appendChild(el.getRootElement());
}
export function replace(el: Component<any>, to: HTMLElement) {
    to.innerHTML = "";
    el.mount();
    to.appendChild(el.getRootElement());
}
export function hydrate(el: Component<any>, to: HTMLElement) {
    el.mount();
    const root = to.childNodes[0];
    morphdom(root, el.getRootElement(), {
        onBeforeElUpdated: (oldEl: Element, newEl: any) => {
            if (newEl._events) {
                newEl._events.map((event: any) => {
                    oldEl.addEventListener(event.eventName, event.listener, event.bubbles);
                });
            }
            if (newEl.onUpdateElement) {
                newEl.onUpdateElement(oldEl);
            }
            return true;
        },
    });

}
