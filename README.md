# NewebComponents

NewebComponents - framework, which has 2 goals:

1. The real separating of the design and logic for user-interface.
2. Reactive web-components without virtual dom, only with HTML5 DOM specification.

NewebComponents use pure HTML for templating, without data-binding, conditions, cycles and event-handlers.

NewebComponents use RxJs as engine for reactivity.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

# Install

    npm install neweb-components --save

    or

    yarn add neweb-components

# Usage

// index.ts

```typescript
import { interval } from "rxjs";
import { Component, Document, render } from "neweb-components";
import View from "./view";
// Bind components to real window-object by special class `Document`
Component.setDocument(new Document({
    window,
}));
// Instance of view
const view = new View({
    counter: interval(),
});
// Render into container #root
render(view, document.getElementById("root") as HTMLElement);
```

// template.html

```html
<div>
    <form name="frmMain">
        <div>
            <input autocomplete="off" name="txtEmail" type="text" placeholder="Type email" />
            <small name="tipsEmail"></small>
        </div>
        <div>
            <input type="submit" value="Save" />
        </div>
    </form>
    <ul name="listEmails">
        <li></li>
    </ul>
</div>
```

// view.ts

```typescript
import { BehaviorSubject, Subject } from "rxjs";
import { Component, ElementComponent, InputComponent, List } from "neweb-components";
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
        this.subscribe(this.email, (value) => {
            if (!value) {
                this.emailError.next(EmailErrorType.Required);
            } else if (value.indexOf("@") === -1) {
                this.emailError.next(EmailErrorType.ShouldContainsDog);
            } else {
                this.emailError.next(EmailErrorType.None);
            }
        });
        this.addElement("lblCounter", new Text({
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
        this.addElement("listEmails", new List({
            items: this.emails,
        }));
    }
    getTemplate() {
        return template;
    }
}
export default View;

```

# API



# Test

    npm install
    npm test

[npm-image]: https://badge.fury.io/js/neweb-components.svg
[npm-url]: https://npmjs.org/package/neweb-components
[travis-image]: https://travis-ci.org/newebio/neweb-components.svg?branch=master
[travis-url]: https://travis-ci.org/newebio/neweb-components
[daviddm-image]: https://david-dm.org/newebio/neweb-components.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/newebio/neweb-components
[coveralls-image]: https://coveralls.io/repos/newebio/neweb-components/badge.svg
[coveralls-url]: https://coveralls.io/r/newebio/neweb-components