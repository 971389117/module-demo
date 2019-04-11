const path = require('path')

module.exports = {
    mode: 'development', //production
    entry: {
        main: './src/index.js'
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
                use: ['style-loader', 'css-loader']
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
                    'postcss-loader'
                ]
            }
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
}
