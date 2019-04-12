import './index.css'
import './index.scss'
import avatar from './avatar.png'
import avatar2 from './avatar2.png'
import './iconfont.css'

let dom=document.createElement('div')
dom.classList.add('rect')
dom.innerHTML='abcdefg'

let img=new Image()
img.src=avatar

let img2=new Image()
img2.src=avatar2

let font=document.createElement('div')
font.className='iconfont icon-douban'

document.querySelector('#root').append(dom,img,img2,font)
