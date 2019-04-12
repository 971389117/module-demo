const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports={
    entry:{
        main:'./index.js'
    },
    plugins:[
        new HtmlWebpackPlugin({template:'index.html'}),
        new CleanWebpackPlugin(),
    ],
    output:{
        filename:'[name].js',
        path:path.resolve(__dirname,'dist')
    }
}
