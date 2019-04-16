const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports={
    // mode:'production',
    // devtool:'cheap-module-source-map', //development
    // production cheap-module-source-map
    entry:{
        main:'./src/index.js'
    },
    // devServer:{
    //     contentBase:'./dist', //服务器根路径
    //     //open:true,
    //     port:8000,
    //     hot:true,  // 开启 hot 加载
    //     hotOnly:true// 即使 html 不生效，浏览器也不刷新
    // },
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
            // {
            //     test:/\.(png|jpg|gif)$/,
            //     use:[
            //         {
            //             loader:'file-loader',
            //             options:{
            //                 name:'[name]-[hash].[ext]',
            //                 outputPath:'images'
            //             }
            //         }
            //     ]
            // },
            {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[name]-[hash].[ext]',
                            outputPath:'images',
                            limit:15240, //8192
                        }
                    }
                ]
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[name]-[hash].[ext]',
                            outputPath:'fonts',
                            limit:1024, //8192
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
        // publicPath:'http://cdn.com.cn',
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}
