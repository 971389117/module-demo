import './index.css'
import './index.scss'
import avatar from './avatar.png'

let dom=document.createElement('div')
dom.classList.add('rect')
dom.innerHTML='abcdefg'

let img=new Image()
img.src=avatar

document.querySelector('#root').append(dom,img)
