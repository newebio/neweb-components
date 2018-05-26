export = {
    entry: __dirname + "/index.js",
    output: {
        path: __dirname,
        filename: "bundle.js",
    },
    devServer: {
        contentBase: __dirname,
        historyApiFallback: true,
        open: true,
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: [{
                loader: require.resolve("html-loader"),
                options: {
                    minimize: true,
                },
            }],
        }],
    },
};
