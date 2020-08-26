const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWepbackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const FileLoader = require('file-loader');

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: { 
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(),
            new TerserWepbackPlugin()
        ]
    }

    return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`; 


module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: {
        app: './js/app/app.js',
        admin: './js/admin/admin.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
    },
    // optimization: optimization(),
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "app.html",
            template: "./pages/app.html",
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ["app"]
        }),
        new HtmlWebpackPlugin({
            filename: "admin.html",
            template: "./pages/admin.html",
            minify: {
                collapseWhitespace: isProd
            },
            chunks: ["admin"]
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CopyWebpackPlugin({
            patterns: [
                { from: './media', to: 'media'}
            ]
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: true,
                        reloadAll: true
                    }
                },
                'css-loader']
            },
            {
                test: /\.(png|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: ['html-loader']
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[name].[ext]'
                //         }
                //     }
                // ],
                // exclude: path.resolve(__dirname, "./src/app.html")
            }
        ]
    }
}

