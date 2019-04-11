阅读文档 或者 用到的技术

    module
    start
    loaders
        file-loader url-loader css-loader style-loader sass-loader postcss-loader

    guides
        Asset Management
        Output Management *
    plugins
        - 在运行到某个时刻的时候，帮你做些事情
        html-webpack-plugin
            npm install html-webpack-plugin -D
            会在打包结束后，自动生成一个 HTML文件，并把打包生成的 js 自动引入到这个 html 文件中
        clean-webpack-plugin
            npm i clean-webpack-plugin -D
    configuration
        output
        entry and Context
        devtool -
