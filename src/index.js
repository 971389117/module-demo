import avatar from './avatar.jpg'
import  './index.scss'
import createAvatar from './createAvatar'

let root=document.querySelector('#root')
createAvatar()

let img=new Image()
img.src=avatar;
img.classList.add('avatar')
root.append(img)
