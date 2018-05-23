import jsdom = require("jsdom");

const dom = new jsdom.JSDOM(`<div id="root"></div>`);
const root = dom.window.document.querySelector(`#root`) as HTMLElement;
root.setAttribute("x", "b");
console.log(root.outerHTML);