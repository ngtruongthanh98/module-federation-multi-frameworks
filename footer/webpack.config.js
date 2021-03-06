const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (_, argv) => ({
    output: {
        publicPath:
            argv.mode === "development"
                ? "http://localhost:3002/"
                : "https://luca-webpack-mfe-footer.surge.sh/",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".vue", ".jsx", ".js", ".json"],
    },

    devServer: {
        port: 3002,
        historyApiFallback: true,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
                "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers":
                "X-Requested-With, content-type, Authorization",
        },
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: "vue-loader",
            },
            {
                test: /\.tsx?$/,
                use: [
                    "babel-loader",
                    {
                        loader: "ts-loader",
                        options: {
                            transpileOnly: true,
                            appendTsSuffixTo: ["\\.vue$"],
                            happyPackMode: true,
                        },
                    },
                ],
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },

    plugins: [
        new VueLoaderPlugin(),
        new ModuleFederationPlugin({
            name: "footers",
            filename: "remoteEntry.js",
            exposes: {
                "./Footer": "./src/Footer.vue",
                "./mountFooter": "./src/mountFooter",
            },
            shared: require("./package.json").dependencies,
        }),
        new HtmlWebPackPlugin({
            template: "./src/index.html",
        }),
    ],
});
