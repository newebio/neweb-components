"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom = require("jsdom");
const dom = new jsdom.JSDOM(`<div id="root"></div>`);
const root = dom.window.document.querySelector(`#root`);
root.setAttribute("x", "b");
console.log(root.outerHTML);
