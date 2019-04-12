import './index.css'

let dom=document.createElement('div')
dom.classList.add('rect')
dom.innerHTML='abcdefg'
document.querySelector('#root').append(dom)
