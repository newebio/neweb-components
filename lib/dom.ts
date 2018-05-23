export function createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) {
    return document.createElement(tagName, options);
}
export function createTextNode(data: string) {
    return document.createTextNode(data);
}
export function getDocument() {
    return document;
}
export function addEventListener(el: Element, eventName: string, listener: (...args: any[]) => void, bubbles: boolean) {
    (el as any)._events = (el as any)._events || [];
    (el as any)._events.push({
        eventName,
        listener,
        bubbles,
    });
    el.addEventListener(eventName, listener, bubbles);
}
