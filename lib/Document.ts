export interface IDocumentConfig {
    window: typeof window;
}
class Document {
    protected document: typeof document;
    constructor(protected config: IDocumentConfig) {
        this.document = this.config.window.document;
    }
    public createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, options?: ElementCreationOptions) {
        return this.document.createElement(tagName, options);
    }
    public createTextNode(data: string) {
        return this.document.createTextNode(data);
    }
    public addEventListener(el: Element, eventName: string, listener: (...args: any[]) => void, bubbles: boolean) {
        (el as any)._events = (el as any)._events || [];
        (el as any)._events.push({
            eventName,
            listener,
            bubbles,
        });
        el.addEventListener(eventName, listener, bubbles);
    }
    public navigate(to: string, replace = false) {
        if (replace) {
            this.config.window.history.replaceState(to, "", to);
        } else {
            this.config.window.history.pushState(to, "", to);
        }
    }
}
export default Document;
