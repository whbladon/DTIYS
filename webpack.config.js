const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development",
  entry: "./client/index.js",
  devServer: {
    publicPath: "/build/",
    proxy: {
        '/api': 'https://localhost:3000'
    }
  },
  output: {
    filename: "bundle.js",
    path: path.join(__dirname, "/build"),
  },
  module: {
    rules: [
      {
        test: /jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /css?$/,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
        ],
      },
    ],
  },
};
