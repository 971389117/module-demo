const path = require('path')
const HTmlwebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
module.exports = {
    mode: 'development', //production development
    entry: {
        main: './src/index.js',
    },
    devServer: {
        contentBase: './dist',
        // open: true,
        port: 8080,
        hot: true, // 开启 hot 加载
        hotOnly: true // 即使 html 不生效，浏览器也不刷新
    },
    module: {
        rules: [{
                test: /\.(jpg|jpeg|png|gif)$/,
                use: {
                    // file-loader
                    loader: 'url-loader',
                    options: {
                        //placeholder 占位符
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 2048
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                    },
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                        }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    plugins: [
        new HTmlwebpackPlugin({
            template: 'src/index.html'
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        publicPath: '/',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
