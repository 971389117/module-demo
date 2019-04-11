const path = require('path')
const HTmlwebpackPlugin=require('html-webpack-plugin')
const CleanWebpackPlugin=require('clean-webpack-plugin')
module.exports = {
    mode: 'development', //production
    entry: {
        main: './src/index.js',
        sub: './src/index.js',
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
                test: /\.(eot|ttf|svg|woff)$/,
                use: 'file-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                    loader:'css-loader',
                    options:{
                        importLoaders:2,
                    }
                    },
                    'sass-loader',
                ]
            }
        ]
    },
    plugins:[new HTmlwebpackPlugin({
        template:'src/index.html'
    }),new CleanWebpackPlugin()],
    output: {
        publicPath:'http://cdn.com.cn',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
