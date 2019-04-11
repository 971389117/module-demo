// import "@babel/polyfill";  设置了presets 或 plugns 之后，不要写这行代码

const arr=[
    new Promise(()=>{

    }),
    new Promise(()=>{

    })
]

arr.map(item=>{
    console.log(item)
})
