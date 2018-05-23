import { Observable } from "rxjs";
import Component from "./Component";

export function isObservable(obj: any): obj is Observable<any> {
    return obj && (typeof (obj.subscribe) === "function");
}
export function isComponent(obj: any): obj is Component<any> {
    return obj && obj.__neweb_component === true;
}
