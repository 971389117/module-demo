const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports={
    entry:{
        main:'./src/index.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    // {
                        //  loader:'css-loader',
                        //  options:{
                            // importLoaders:2
                        //  }
                    // }
                    'sass-loader',
                    'postcss-loader',
                ]
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:'[name]-[hash].[ext]',
                            outputPath:'images'
                        }
                    }
                ]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new CleanWebpackPlugin(),
    ],
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}
