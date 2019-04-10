import Header from './header.js'
import Content from './content.js';
import Sidebar from './sidebar.js';
import avatar from './avatar.jpg'
// import './index.css';
import './index.scss'

console.log(avatar)
let root=document.querySelector('#root')

let img=new Image()
img.src=avatar;
img.classList.add('avatar')
root.append(img)
console.log(root)

new Header()
new Content()
new Sidebar()
