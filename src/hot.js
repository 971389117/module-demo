function hotTest(){

    let btn=document.createElement('button')
    btn.innerHTML='新增'
    document.body.append(btn)
    btn.onclick=function(){
        let div=document.createElement('div')
        div.innerHTML='item'
        document.body.append(div)
    }

}

export default hotTest