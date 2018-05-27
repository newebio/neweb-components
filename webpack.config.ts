// tslint:disable-next-line:no-implicit-dependencies
import webpack = require("webpack");
const config: webpack.Configuration = {
    entry: __dirname + "/browser.js",
    output: {
        path: __dirname + "/dist",
        filename: "neweb-components.min.js",
    },
};
export = config;
