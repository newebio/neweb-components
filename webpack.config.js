"use strict";
const config = {
    entry: {
        "dist/": __dirname + "/browser.js",
        "docs/": __dirname + "/browser.js",
    },
    output: {
        path: __dirname + "/",
        filename: "[name]neweb-components.min.js",
    },
};
module.exports = config;
