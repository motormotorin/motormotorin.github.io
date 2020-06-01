const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development", 
    entry: {
        app: "./src/js/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'admin.html',
            template: './src/admin.html'
        })
    ]
}
