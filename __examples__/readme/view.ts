import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { Subject } from "rxjs/Subject";
import { Component, ElementComponent, InputComponent, ListComponent, TextNode } from "../..";
import template = require("./template.html");

enum EmailErrorType {
    None = "",
    Required = "Required",
    ShouldContainsDog = "Email should contains @",
}

class View extends Component<{
    counter: Observable<number>;
}> {
    email = new BehaviorSubject("");
    emailError = new BehaviorSubject(EmailErrorType.Required);
    emails = new BehaviorSubject<string[]>([]);
    submit = new Subject<void>();
    beforeMount() {
        this.addSubscription(this.email, (value) => {
            if (!value) {
                this.emailError.next(EmailErrorType.Required);
            } else if (value.indexOf("@") === -1) {
                this.emailError.next(EmailErrorType.ShouldContainsDog);
            } else {
                this.emailError.next(EmailErrorType.None);
            }
        });
        this.addElement("lblCounter", new TextNode({
            value: this.props.counter.pipe(map((v) => v.toString())),
        }));
        this.addElement("txtEmail", new InputComponent({
            value: this.email,
        }));
        this.addElement("tipsEmail", new ElementComponent({
            innerHTML: this.emailError,
        }));
        this.addElement("frmMain", new ElementComponent({
            events: {
                submit: (e) => {
                    e.preventDefault();
                    if (!this.emailError.getValue()) {
                        const items = this.emails.getValue();
                        items.push(this.email.getValue());
                        this.emails.next(items);
                        this.email.next("");
                    }
                },
            },
        }));
        this.addElement("listEmails", new ListComponent({
            items: this.emails,
        }));
    }
    getTemplate() {
        return template;
    }
}
export default View;
