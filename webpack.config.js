const path = require('path')
const HTmlwebpackPlugin=require('html-webpack-plugin')
const CleanWebpackPlugin=require('clean-webpack-plugin')
module.exports = {
    mode: 'development', //production development
    // development devtool:'cheap-module-eval-source-map',
    // production devtool:'cheap-module-source-map',
    entry: {
        main: './src/index.js',
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
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    }
}
