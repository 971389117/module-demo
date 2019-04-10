#

## part1

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
## part2

于是，我们这样写代码。

index.html

```html
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

每一个模块单独写一个 js 文件，要做什么可以直接去找，省的一个JS文件太过臃肿。
其实想一想，写代码和小时候学作文一样，最开始，我们都只会写一段，没感觉有什么不好，因为那时候一段就能满足我们的需求。
后来长大了，写的内容变多了，发现一段不利于阅读，于是我们学会了分段。

本节 tag : v2

回到正题，这样似乎是解决了刚才的问题，但是又诞生了新的问题。
1.每个 js 文件都会发送一个 HTTP 请求，HTTP 请求过多，会影响网页的加载速度。
2.如果 index.html 里的 js 文件顺序错了，很可能引发意想不到的错误，增加维护成本。
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
