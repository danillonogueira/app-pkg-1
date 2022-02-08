const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const { ModuleFederationPlugin } = require('webpack').container; 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const port = 8000;

module.exports = {
  mode: "development",
  cache: false,
  devtool: "source-map",
  target: "web",
  optimization: {
    minimize: false
  },
  entry: path.resolve(__dirname, "./src/main.js"),
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: `http://localhost:${port}/`
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue: "@vue/runtime-dom",
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, 'src/assets')
    }
  },
  module: {
    rules: [
      { test: /\.vue$/, loader: "vue-loader" },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.css|.sass|.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.png$/,
        use: {
          loader: "url-loader",
          options: {
            esModule: false,
            name: "[name].[ext]",
            limit: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      chunks: ["main"],
    }),
    new ModuleFederationPlugin({
      name: "app_pkg_1",
      remotes: {},
      filename: "remoteEntry.js",
      shared: {
        vue: {
          eager: true,
          singleton: true,
        },
      },
      exposes: {
        "./Table": "./src/components/Table.vue"
      }
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public")
    },
    compress: true,
    port,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
};