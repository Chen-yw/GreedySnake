const path = require("path");

// 引入html插件
const HTMLWebpackPlugin = require("html-webpack-plugin");

//引入clean插件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),

    // 配置webpack打包输出环境，不使用箭头函数
    // environment: {
    //   arrowFunction: false,
    //   const: false,
    // },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        // loader的执行顺序是从后往前，先用ts-loader将ts文件转换为js
        // 再用babel-loader将新版本的js转换为旧版本的js
        use: [
          {
            // 指定加载器
            loader: "babel-loader",
            // 配置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境插件
                  "@babel/preset-env",
                  // 配置信息
                  {
                    // 指定要兼容的目标浏览器
                    targets: {
                      chrome: "88",
                      // ie: "11",
                    },
                    // 指定corejs的版本
                    corejs: "3",
                    // 使用corejs的方式，"usage"表示按需加载
                    useBuiltIns: "usage",
                  },
                ],
              ],
            },
          },
          "ts-loader",
        ],
        exclude: /node_modules/,
      },

      // 设置less文件的处理
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          // 引入postcss
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "post-preset-env",
                    {
                      // 设置兼容的浏览器，兼容浏览器当前最新的两个版本
                      browsers: "last 2 versions",
                    },
                  ],
                ],
              },
            },
          },
          "less-loader",
        ],
      },
    ],
  },

  // 配置webpack插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // title: "这是一个自定义的title",
      template: "./src/index.html",
    }),
  ],

  // 用来设置哪些文件可以作为模块被引入
  resolve: {
    extensions: [".ts", ".js", ".css", ".less"],
  },

  devtool: "inline-source-map",
};
