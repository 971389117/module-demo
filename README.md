#

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


