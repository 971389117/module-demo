// import './style.css'
// let btn=document.createElement('button')
// btn.innerHTML='新增'
// document.body.appendChild(btn)
// btn.addEventListener('click',(e)=>{
//     let div=document.createElement('div')
//     div.innerHTML='item'
//     document.body.append(div)
// })


import counter from './counter';
import number from './number';
counter()
number()

if(module.hot){
    module.hot.accept('./number',()=>{
        // document.querySelector('#number')
        // document.body.removeChild()
        number();
    })
}
