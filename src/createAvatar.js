import avatar from './avatar.jpg'

function createAvatar(){
    let root=document.querySelector('#root')

    let img=new Image()
    img.src=avatar;
    img.classList.add('avatar')
    root.append(img)

}

export default createAvatar;
