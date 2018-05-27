// tslint:disable-next-line:no-implicit-dependencies
import webpack = require("webpack");
const config: webpack.Configuration = {
    entry: {
        "dist/": __dirname + "/browser.js",
        "docs/": __dirname + "/browser.js",
    },
    output: {
        path: __dirname + "/",
        filename: "[name]neweb-components.min.js",
    },
};
export = config;
