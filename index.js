let dom=document.querySelector('#root')

let header=document.createElement('div')
header.innerText='header'
dom.append(header) 

let sidebar=document.createElement('div')
sidebar.innerText='sidebar'
dom.append(sidebar)

let content=document.createElement('div')
content.innerText='content'
dom.append(content)
