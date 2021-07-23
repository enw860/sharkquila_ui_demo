const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

const outputDirectory = "dist";

const TITLE = "Sharkquila UI";
const DESCRIPTION = "A runtime implementation of sharkquila_ui_toolkit (A Vue based UI toolkit set)."

module.exports = {
  entry: {
    "sharkquila": "./client/index.js",
  },
  resolve: {
    extensions: [".vue", ".js", ".less", ".css"]
  },
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: "[name].bundle.js",
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.min.css"
    }),
    new HtmlWebpackPlugin({
      title: TITLE,
      favicon: "./public/favicon.ico",
      template: "./public/index.html",
      filename: "index.html",
      chunks: ["sharkquila"],
      meta: {
        'description': { name: 'description', contnet: DESCRIPTION },
        "og:type": { property: 'og:type', content: 'website' },
        'og:title': { name: "title", property: 'og:title', content: TITLE },
        'og:description': { name: "description", property: 'og:description', content: DESCRIPTION },
        "og:image": { name: "image", property: "og:image", content: "https://lh3.googleusercontent.com/pw/AM-JKLUT4ncKKKE8ik-uNhT9otAKUosFa58RFW3tIjXBZY_ShzASzvO5_3c9qNsuxrPW2vZZlC0Qv8op2p9YBsC39bK0vNMIAeLgmx0Z73A43u_dufSQjvjojjYjfcLd5RcZkY4BSwtw-PGJIP9QoX0VxTzl=w1286-h732-no?authuser=0" },
        "author": { name: "author", content: "Lionel Wu" }
      }
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true
              }
            }
          ],
        }
      })
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      }, {
        test: /\.vue$/,
        loader: "vue-loader"
      }, {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
      }, {
        test: /\.(ico|jpe?g|png|svg|gif)$/,
        use: [{
          loader: "file-loader",
          options: {
            publicPath: "images",
            outputPath: "images"
          },
        }]
      }
    ]
  },
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    overlay: true,
    port: 8000,
    stats: {
      normal: true
    },
    proxy: {
      "/": "http://localhost:8080"
    }
  }
}