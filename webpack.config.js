const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.jsx"],
    resolve: {
        extensions: [".js", ".jsx"]
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({template: "./src/index.html"}),
        new CleanWebpackPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
            },
            {
                test: /\.(jpg|png|svg|gif)$/,
                type: 'asset/resource',
            },
            {
                test: /\.jsx|js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }
            }
        ]
    }
}
