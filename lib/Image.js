"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const Component_1 = require("./Component");
class Image extends Component_1.default {
    constructor() {
        super(...arguments);
        this.tagName = "img";
    }
    afterInit() {
        const source = this.props.source;
        if (source instanceof rxjs_1.Observable) {
            source.subscribe((src) => {
                this.rootElement.setAttribute("src", src);
            });
        }
        else {
            this.rootElement.setAttribute("src", source);
        }
    }
}
exports.default = Image;
