import avatar from './avatar.jpg'
import style from './index.scss'
import createAvatar from './createAvatar'

let root=document.querySelector('#root')
createAvatar()

let img=new Image()
img.src=avatar;
img.classList.add(style.avatar)
root.append(img)
