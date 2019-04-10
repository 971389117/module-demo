function Content() {
    let dom = document.querySelector('#root')
    let content = document.createElement('div')
    content.innerText = 'content'
    dom.append(content)
}
