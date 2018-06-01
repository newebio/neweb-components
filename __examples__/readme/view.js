"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BehaviorSubject_1 = require("rxjs/BehaviorSubject");
const map_1 = require("rxjs/operators/map");
const Subject_1 = require("rxjs/Subject");
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
        this.email = new BehaviorSubject_1.BehaviorSubject("");
        this.emailError = new BehaviorSubject_1.BehaviorSubject(EmailErrorType.Required);
        this.emails = new BehaviorSubject_1.BehaviorSubject([]);
        this.submit = new Subject_1.Subject();
    }
    beforeMount() {
        this.addSubscription(this.email, (value) => {
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
        this.addElement("lblCounter", new __1.TextNode({
            value: this.props.counter.pipe(map_1.map((v) => v.toString())),
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
