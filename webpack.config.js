const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: ["./src/index.js"],
  context: __dirname,
  target: "web",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "presentation-facets.js",
    publicPath: "/dist/",
    library: "presentation-facets",
    globalObject: "this",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          { "loader": "file-loader",
          options: {
            name: "[name].[ext]",
          }}
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: [
          { "loader": "file-loader",
          options: {
            name: "[name].[ext]",
          }}
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: [{
          loader: "style-loader"
        },
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader", options: {
            sourceMap: true
          }
        },
        {
          loader: "sass-loader", options: {
            sourceMap: true
          }
        }]
      }
    ]
  },
  externals: {
    "presentation-decorator": {
      commonjs: "presentation-decorator",
      commonjs2: "presentation-decorator",
      amd: "presentation-decorator",
      root: "presentation-decorator"
    },
    "presentation-dom": {
      commonjs: "presentation-dom",
      commonjs2: "presentation-dom",
      amd: "presentation-dom",
      root: "presentation-dom"
    },
    "presentation-models": {
      commonjs: "presentation-dom",
      commonjs2: "presentation-dom",
      amd: "presentation-dom",
      root: "presentation-dom"
    }
  },
  stats: "errors-only",
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(require("./package.json").version)
    })
  ]
};
