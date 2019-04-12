const webpack = require('webpack');
const merge=require('webpack-merge')
const commonConfig=require('./webpack.common.js')
const devConfig={
    mode:'production',
    devtool:'cheap-module-eval-source-map',

    devServer:{
        contentBase:'./dist', //服务器根路径
        //open:true,
        port:8000,
        hot:true,  // 开启 hot 加载
        hotOnly:true// 即使 html 不生效，浏览器也不刷新
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ],
    optimization: {
        usedExports: true
      }
}
module.exports = merge(commonConfig,devConfig)
