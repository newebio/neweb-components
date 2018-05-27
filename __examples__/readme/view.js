"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const __1 = require("../..");
const template = require("./template.html");
var EmailErrorType;
(function (EmailErrorType) {
    EmailErrorType["None"] = "";
    EmailErrorType["Required"] = "Required";
    EmailErrorType["ShouldContainsDog"] = "Email should contains @";
})(EmailErrorType || (EmailErrorType = {}));
class View extends __1.Component {
    constructor() {
        super(...arguments);
        this.email = new rxjs_1.BehaviorSubject("");
        this.emailError = new rxjs_1.BehaviorSubject(EmailErrorType.Required);
        this.emails = new rxjs_1.BehaviorSubject([]);
        this.submit = new rxjs_1.Subject();
    }
    beforeMount() {
        this.subscribe(this.email, (value) => {
            if (!value) {
                this.emailError.next(EmailErrorType.Required);
            }
            else if (value.indexOf("@") === -1) {
                this.emailError.next(EmailErrorType.ShouldContainsDog);
            }
            else {
                this.emailError.next(EmailErrorType.None);
            }
        });
        this.addElement("lblCounter", new __1.Text({
            value: this.props.counter.pipe(operators_1.map((v) => v.toString())),
        }));
        this.addElement("txtEmail", new __1.InputComponent({
            value: this.email,
        }));
        this.addElement("tipsEmail", new __1.ElementComponent({
            innerHTML: this.emailError,
        }));
        this.addElement("frmMain", new __1.ElementComponent({
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
        this.addElement("listEmails", new __1.List({
            items: this.emails,
        }));
    }
    getTemplate() {
        return template;
    }
}
exports.default = View;