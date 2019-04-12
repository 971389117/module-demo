function counter(){
    let div=document.createElement('div')
    let i=2
    div.innerHTML=1
    div.addEventListener('click',e=>{
        e.target.innerText=i++
    })
    document.body.append(div)
}

export default counter
