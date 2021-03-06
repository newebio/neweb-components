"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interval_1 = require("rxjs/observable/interval");
const __1 = require("./../..");
const view_1 = require("./view");
// Bind components to real window-object by special class `Document`
__1.Component.setDocument(new __1.Document({
    window,
}));
// Instance of view
const view = new view_1.default({
    counter: interval_1.interval(),
});
// Render into container #root
__1.render(view, document.getElementById("root"));
