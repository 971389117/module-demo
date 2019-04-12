# 笔记

- [笔记](#%E7%AC%94%E8%AE%B0)
  - [什么是模块化呢？](#%E4%BB%80%E4%B9%88%E6%98%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E5%91%A2)
    - [前端的蛮荒时代](#%E5%89%8D%E7%AB%AF%E7%9A%84%E8%9B%AE%E8%8D%92%E6%97%B6%E4%BB%A3)
    - [分段式前端](#%E5%88%86%E6%AE%B5%E5%BC%8F%E5%89%8D%E7%AB%AF)
    - [模块化 - 分章节写作](#%E6%A8%A1%E5%9D%97%E5%8C%96---%E5%88%86%E7%AB%A0%E8%8A%82%E5%86%99%E4%BD%9C)
    - [引出 webpack 解决问题](#%E5%BC%95%E5%87%BA-webpack-%E8%A7%A3%E5%86%B3%E9%97%AE%E9%A2%98)
    - [什么是模块化总结](#%E4%BB%80%E4%B9%88%E6%98%AF%E6%A8%A1%E5%9D%97%E5%8C%96%E6%80%BB%E7%BB%93)
  - [webpack](#webpack)
    - [entryAndOutput](#entryandoutput)
    - [plugins](#plugins)
    - [loader](#loader)
      - [css](#css)
      - [scss](#scss)
      - [图像](#%E5%9B%BE%E5%83%8F)
      - [url-loader](#url-loader)
      - [字体库](#%E5%AD%97%E4%BD%93%E5%BA%93)
      - [小节](#%E5%B0%8F%E8%8A%82)
    - [热部署](#%E7%83%AD%E9%83%A8%E7%BD%B2)
      - [watch](#watch)
      - [devServer](#devserver)
    - [SourceMap](#sourcemap)
    - [开发环境和上线环境](#%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E5%92%8C%E4%B8%8A%E7%BA%BF%E7%8E%AF%E5%A2%83)
    - [babel 配置](#babel-%E9%85%8D%E7%BD%AE)

## 什么是模块化呢？

编程时，了解一个概念，最好的方式是了解它的发展，从历史上了解，为什么会出现这种技术？

>>将一个复杂的程序依据一定的规则（规范）封装成几个块（文件），并进行组合在一起。
>>块的内部数据/实现是私有的，只是向外部暴露一些接口（方法）与外部其它模块通信。

### 前端的蛮荒时代

在最开始，前端是这样做开发的

index.html

```html
<p>这是我们的网页内容</p>
<div id="root"></div>
<script src="./index.js"></script>
```

index.js

```js
let dom = document.querySelector("#root");

let header = document.createElement("div");
header.innerText = "header";
dom.append(header);

let sidebar = document.createElement("div");
header.innerText = "sidebar";
dom.append(header);

let content = document.createElement("div");
header.innerText = "content";
dom.append(header);
```

可是随着项目的扩展，代码会越来越臃肿，越来越难以维护。

本节 tag : v1

### 分段式前端

（我自己起的名）
于是，我们这样写代码。

index.html

```html
<p>这是我们的网页内容</p>
<div id="root"></div>

<script src="./header.js"></script>
<script src="./content.js"></script>
<script src="./sidebar.js"></script>
<script src="./index.js"></script>
```

content.js

```js
function Content() {
  let dom = document.querySelector("#root");
  let content = document.createElement("div");
  content.innerText = "content";
  dom.append(content);
}
```

header.js

```js
function Header() {
  let dom = document.querySelector("#root");
  let header = document.createElement("div");
  header.innerText = "header";
  dom.append(header);
}
```

sidebar.js

```js
function Sidebar() {
  let dom = document.querySelector("#root");
  let sidebar = document.createElement("div");
  sidebar.innerText = "sidebar";
  dom.append(sidebar);
}
```

index.js

```js
new Header();
new Content();
new Sidebar();
```

仔细看看，有什么不同了呢？

每一个模块单独写一个 js 文件，要做什么可以直接去找，省的一个 JS 文件太过臃肿。
其实想一想，写代码和小时候学作文一样，最开始，我们都只会写一段，没感觉有什么不好，因为那时候一段就能满足我们的需求。
后来长大了，写的内容变多了，发现一段不利于阅读，于是我们学会了分段。

本节 tag : v2

回到正题，这样似乎是解决了刚才的问题，但是又诞生了新的问题。 1.每个 js 文件都会发送一个 HTTP 请求，HTTP 请求过多，会影响网页的加载速度。 2.如果 index.html 里的 js 文件顺序错了，很可能引发意想不到的错误，增加维护成本。
例如：把 index.js 不小心写在了 header.js 的前面

```html
<script src="./index.js"></script>
<script src="./header.js"></script>
```

控制台告诉我们：

```
index.js:2 Uncaught ReferenceError: Header is not defined
    at index.js:2
```

本节 tag : v2.1

### 模块化 - 分章节写作

这回，我们又成长了，就好像作家不仅会分段，还会分章节。而我们在通过在一个 js 文件里直接引入其它的 js 文件，避免了 part2
中所描述的问题，从而实现了模块的分离，这也就是人们常说的模块化。

index.html

```html
<p>这是我们的网页内容</p>
<div id="root"></div>

<script src="./index.js"></script>
```

content.js

```js
function Content() {
  let dom = document.querySelector("#root");
  let content = document.createElement("div");
  content.innerText = "content";
  dom.append(content);
}
export default Content;
```

header.js

```js
function Header() {
  let dom = document.querySelector("#root");
  let header = document.createElement("div");
  header.innerText = "header";
  dom.append(header);
}
export default Header;
```

sidebar.js

```js
function Sidebar() {
  let dom = document.querySelector("#root");
  let sidebar = document.createElement("div");
  sidebar.innerText = "sidebar";
  dom.append(sidebar);
}
export default Sidebar;
```

index.js

```js
import Header from "./header.js";
import Content from "./content.js";
import Sidebar from "./sidebar.js";

new Header();
new Content();
new Sidebar();
```

本节 tag : v3

但是如果你运行上面的代码，多半会出现报下面的问题。

```
Uncaught SyntaxError: Unexpected identifier
```

这是因为现在的浏览器尚不支持 es6 的语法。当然，可能在你使用的时候已经支持了。甚至，我们又进化了呢？

### 引出 webpack 解决问题

为了解决上面的问题，webpack 等打包工具应用而生。

webpack is a module bundler.

解决问题三步走 1.在项目中安装 webpack
`npm install webpack webpack-cli -D` 2.用 webpack 编译项目
`npx webapck index.js` 3.将 index.html 改成下面这样

```html
<p>这是我们的网页内容</p>
<div id="root"></div>

<script src="./dist/main.js"></script>
```

好了，我们也学会给代码分章节了，问题解决了，终于可以好好写代码了。

如果你感兴趣，可以发现 webpack 把四个 js 文件 压缩成了一个 main.js ,而 main.js 中的代码被压缩成了一行，连空格都没有了呢。

本节 tag : v4

### 什么是模块化总结

技术是在不断进步的，随时都可能出现新的解决方案，而上面所写的也不过是让你了解模块化的概念，更多的东西，还需要你继续学习。

## webpack

如果上面的都没有问题，那么你已经安装好了 webpack，并执行了第一次打包工作。

好了，现在为了接下来的学习，我们需要对目录进行精简，删除 `content.js`,`header.js`,`sidebar.js`,`dist·文件夹`
或者新建一个文件夹，使我们的目录下只剩下了一点东西
module_demo
index.html
indexjs

我们需要包管理工具,初始化 npm
`npm init`

手动创建 webpack 配置文件
`webpack.config.js`

修改 index.html

```html
<p>这是我们的网页内容</p>
<div id="root"></div>
```

修改 index.js

```js
let dom = document.createElement("div");
dom.innerHTML = "abcdefg";
document.querySelector("#root").append(dom);
```

学习一样新东西，一定是从概念开始的。

### entryAndOutput

创建 `webpack.config.js` 文件，输入以下内容

```js
const path = require("path");

module.exports = {
  entry: {
    main: "./index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
```

运行 `npx webpack`,然后将 `index.html` copy 到 `dist`目录。
这段代码整体就做了一件事，将 `./index.js` 通过 webpack 打包成 `./dist/index.js`

首先呢，运行一下代码，自己感受一下。
下面逐个解释：

- entry 是程序的打包入口，可以有多个值，例如
  entry:{main:'index.js',sub:'xxx.js', ...}
- output 是输出的目录，
- output.filename 打包后的文件名; `[name].js` 中的 [name]是占位符，在这里会被替换成 entry.main 中的 `index`，你也可以不使用占位符，例如 `bundle.js`
- output.path 是一个绝对路径
- \_\_dirname 代表当前目录的绝对路径
- path.resolve 的作用是将`__dirname`和`dist`拼装成一个绝对路径字符串

> > 很多东西理解了更好，不理解也没关系，代码跑通了，知道它能够做什么就够了，毕竟，copy run 大法好。

### plugins

插件类似其它程序中的生命周期函数，在 webpack 打包的某一个时间点，做一些事情。

在 `webpack.config.js` 中写入下面的代码

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
module.exports = {
  entry: {
    main: "./index.js"
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "src/index.html" }),
    new CleanWebpackPlugin()
  ],
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  }
};
```

运行这段代码之前，要安装两个插件
`npm i -D html-webpack-plugin clean-webpack-plugin`

继续运行一下试试吧。`npx webpack`

这段新增的代码也做了一件事，在打包的时候，把上一次打包成的`dist`目录删除【new CleanWebpackPlugin()】,然后将`index.html` 作为模板，copy 到 output 输出的目录中。

本节分支：git checkout entryAndOutputAndPlugins

### loader

webpack 可以自动打包 js 文件，所以上面的程序运行很 ok，但是它默认无法打包 css,图片，各种数据文件等等，需要做一些配置来实现他们,这个就是 loader。

#### css

将目录修改为以下形式:
module-demo
src
index.html
index.js
index.css
package.json
...

index.css

```css
.rect {
  height: 30px;
  width: 30px;
  background-color: gray;
}
```

index.js

```js
import "./index.css";

let dom = document.createElement("div");
dom.classList.add("rect");
dom.innerHTML = "abcdefg";
document.querySelector("#root").append(dom);
```

我们通过 js ，让 webpack 来处理引入关系，而不再手动处理。

webpack.config.js

```js
    ...
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
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new CleanWebpackPlugin(),
    ],
    ...
}
```

安装两个 loader
`npm i -D style-loader css-loader`
打开 dist/index.html 看一看，css 起作用了。

再打开控制面板，找到 `head`，可以看到 style 被引入到这里了。

这里需要注意的点是：先执行 css-loader,后执行 style-loader,也就是多 loader 时候，是从下往上执行。
css-loader 让 webpack 可以在 js 中引入 css
style-loader 将引入的 css 导入到 index.html 中。

本节 tag:
git checkout loader\_
git reset --hard loader-css

#### scss

除了 css，我们还希望引入 scss 等东西。

新建 index.scss

```scss
body {
  div {
    color: blue;
  }
}
```

webpack.config.js

```js
    ...
    module:{
       ...
            {
                test:/\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                    'postcss-loader',
                ]
            }
        ]
    },
    ...
```

postcss-loader 是可选的，它可以为一些新特性自动加上厂商前缀
创建文件 postcss.config.js

```js
module.exports = {
  plugins: [
    require("autoprefixer") //自动加厂商前缀
  ]
};
```

安装 loader 和 依赖
`npm i -D sass-loader postcss-loader node-sass autoprefixer`

运行，OK 本节 tag loader-scss

**然后我们解决一个 scss 多层导入的问题**
好像已经解决了？`importLoaders`

#### 图像

src 下粘贴一张图片,取名 `avatar.png`
index.js

```js
import avatar from './avatar.png'

...

let img=new Image()
img.src=avatar

document.querySelector('#root').append(img)

```

webpack.config.js

```js
  {
    test:/\.(png|jpg|gif)$/,
    use:[
     {
        loader:'file-loader',
        options:{
          name:'[name]-[hash].[ext]',outputPath:'images'
          }
      }
    ]
  },
```

`npm i -D file-loader`

name:输出后的名字 [name] 原文件名 [hash] hash 码，后缀[ext] ，拼接后文件名就是 `avatar-cc90b6a0859f94fe216618ee19bb0aa5.png`
outputPath:输出的文件路径

本节 tag：loader-file-img

#### url-loader

url-loader works like file-loader, but can return a DataURL if the file is smaller than a byte limit.
将小图片转成 base64,可以减少 HTTP 请求
index.js

```js
import avatar2 from './avatar2.png'

...
let img2=new Image()
img2.src=avatar2

document.querySelector('#root').append(dom,img,img2)
```

webpack.config.js

```js
        {
                test:/\.(png|jpg|gif)$/,
                use:[
                    {
                        loader:'url-loader',
                        options:{
                            name:'[name]-[hash].[ext]',
                            outputPath:'images',
                            limit:10240, //8192
                        }
                    }
                ]
            },
```

> > Base64 是一种基于 64 个可打印字符来表示二进制数据的表示方法。

`npm i -D url-loader`

#### 字体库

接下来，我们引入一些字体库

[下载](https://www.iconfont.cn/api/project/download.zip?spm=a313x.7781069.1998910419.d7543c303&pid=1100450&ctoken=LO0hFvm7f1Jol_kcKMwve5qW)字体库

复制到 src 目录下

index.js

```js
import './iconfont.css'

...
let font=document.createElement('div')
font.className='iconfont icon-douban'

document.querySelector('#root').append(dom,img,img2,font)

```

webpack.config.js

```js
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
```

如果一切正常，图标已经显示出来了。

#### 小节

loader 有很多很多，各种各样的 loader，但归根结底，它们的作用都是让 webpack 知道怎么打包类型文件。

### 热部署

每次写完代码，都得 `npx ...` 是不是很麻烦，通过命令让你不再麻烦。

#### watch

package.json

```json
  ...
  "scripts": {
    "watch":"webpack --watch"
  },
  ...
```

半自动编译，手动刷新浏览器

#### devServer

package.json

```json
  ...
  "scripts": {
    "start": "webpack-dev-server"
  },
  ...
```

webpack.config.js

```js
    devServer:{
        contentBase:'./dist',
        //open:true,
        port:8080,
    }
```

`npm i -D webpack-dev-server`
新的命令
`npm run start`

浏览器自动刷新，但是还可以更强大

**HotModuleReplacement**

更改 CSS JS 后不更新浏览器，完全热更新模块
webpack.config.js

```js
    const webpack = require('webpack');
    ...
    devServer:{
        contentBase:'./dist',
        //open:true,
        port:8080,
        hot:true,  // 开启 hot 加载
        hotOnly:true// 即使 html 不生效，浏览器也不刷新 | 如果出错了，不自动刷新浏览器
    }
    ...
        plugins:[
        new HtmlWebpackPlugin({template:'./src/index.html'}),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    ...
```

做的 CSS 修改完全自动热更新，vue 、react 组件也可以完全自动热加载，因为它们都做了部署。而你自己写的 JS 文件，或者其它冷门的格式可能需要自己写部署，有点麻烦。
例如：
index.js

```js
if (module.hot) {
  module.hot.accept("./number", () => {
    document.body.removeChild(document.querySelector("#number"));
    number();
  });
}
```

当模块发生改变时，执行回调函数。

devServer 会在内存中，提高处理速度

### SourceMap

打包后的文件，在调试的时候有些问题，SourceMap 可以解决这个问题。

webpack.config.js

```js
    mode:'development',
    devtool:'cheap-module-eval-source-map', //development
    // production cheap-module-source-map
```

### 开发环境和上线环境

根目录下新建`build`文件夹
build 文件夹下创建 `webpack.common.js`,`webpack.dev.js`,`webpack.prod.js`

1.将通用配置写在 `commom.js`中 2.将剩下的开发配置写在`dev.js`中 3.将剩下的上线配置写在 `prod.js` 中 4.将`common.js`和`dev.js`、`prod.js`合并
dev.js

```js
const webpack = require("webpack");
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");
const devConfig = {
  mode: "production",
  devtool: "cheap-module-eval-source-map",

  devServer: {
    contentBase: "./dist", //服务器根路径
    //open:true,
    port: 8000,
    hot: true, // 开启 hot 加载
    hotOnly: true // 即使 html 不生效，浏览器也不刷新
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};
module.exports = merge(commonConfig, devConfig);
```

prod.js

```js
const merge = require("webpack-merge");
const commonConfig = require("./webpack.common.js");

const prodConfig = {
  mode: "production",
  devtool: "cheap-module-source-map"
};

module.exports = merge(commonConfig, prodConfig);
```

5.安装
`npm i -D webpack-merge` 6.修改 `package.json`

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack-dev-server --config ./build/webpack.dev.js",
    "build": "webpack --config ./build/webpack.prod.js",
    "watch": "webpack --watch"
  },
```

这样，环境就配好了。

### babel 配置

剩余的部分，请看教程
