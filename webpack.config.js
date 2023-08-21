/*
 * @Descripttion: webpack 配置项目
 * @version: 1.0.0
 * @Author: jiaxiantao
 * @Date: 2021-08-24 17:47:29
 * @LastEditors: jiaxiantao
 * @LastEditTime: 2021-09-07 23:35:45
 */
const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { log } = require("console");

const NODE_ENV = process.env.NODE_ENV || false;
const BUILD_MODE = process.env.BUILD_MODE || false;
const isProduction = NODE_ENV === "production" || false;
const isModuleBuild = BUILD_MODE === "module" || false;
log(isModuleBuild,'isModuleBuild');
module.exports = {
  mode: isProduction ? "production" : "development",
  entry: {
    index: isModuleBuild ? "./src/hooks/useTable.ts" : "./src/index.tsx",
  }, //如果你将 entry 设置为一个 array，那么只有数组中的最后一个会被暴露成库
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, isModuleBuild ? "lib" : "dist"),
    library: {
      name: "use-x-table",
      type: "umd", // 以库的形式导出入口文件时，输出的类型,这里是通过umd的方式来暴露library,适用于使用方import的方式导入npm包
    },
  },
  // 实现代码分离
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "chunk", // 拆分 chunk 的名称。设为 false 将保持 chunk 的相同名称，因此不会不必要地更改名称。这是生产环境下构建的建议值。
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 4000,
    open: true,
  },
  externals: isModuleBuild
    ? {
        react: "react",
        "react-dom": "react-dom",
        "antd":"antd"
      }
    : {},
  plugins: [
    !isModuleBuild &&
      new htmlWebpackPlugin({
        template: "public/index.html",
      }),
    isProduction && new CleanWebpackPlugin(),
  ].filter(Boolean),
};
