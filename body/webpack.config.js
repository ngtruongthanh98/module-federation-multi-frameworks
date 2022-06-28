const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;

module.exports = (_, argv) => ({
  output: {
    publicPath:
      argv.mode === "development"
        ? "http://localhost:3001/"
        : "https://luca-webpack-mfe-body.surge.sh/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "body",
      filename: "remoteEntry.js",
      remotes: {
        footer:
          argv.mode === "development"
            ? "footers@http://localhost:3002/remoteEntry.js"
            : "footers@https://luca-webpack-mfe-footer.surge.sh/remoteEntry.js",
        // header:
        //     argv.mode === "development"
        //         ? "headers@http://localhost:8080/remoteEntry.js"
        //         : "headers@https://luca-webpack-mfe-header.surge.sh/remoteEntry.js",
        products:
          argv.mode === "development"
            ? "Products@http://localhost:3003/remoteEntry.js"
            : "Products@https://luca-webpack-mfe-products.surge.sh/remoteEntry.js",
        common:
          argv.mode === "development"
            ? "Common@http://localhost:3004/remoteEntry.js"
            : "Common@https://luca-webpack-mfe-common.surge.sh/remoteEntry.js",
      },
      // remotes: {
      //     footer: "footers@https://luca-webpack-mfe-footer.surge.sh/remoteEntry.js",
      //     // header: "headers@https://luca-webpack-mfe-header.surge.sh/remoteEntry.js",
      //     products:
      //         "Products@https://luca-webpack-mfe-products.surge.sh/remoteEntry.js",
      //     common: "Common@https://luca-webpack-mfe-common.surge.sh/remoteEntry.js",
      // },
      exposes: {},
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
});
