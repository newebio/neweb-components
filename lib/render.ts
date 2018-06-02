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
    to.replaceChild(el.getRootElement(), root);
    // TODO: MAKE REAL HYDRATE
}
