const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {x: 0, y: 0}

function random_color(){
    return `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)})`
}

class Object{
    constructor(x,y){
      
    }
    
    draw(){
       
    }

    update(){

    }
}


function render(){

    requestAnimationFrame(render)
}


onmousemove = (e) => {
    mouse.x = e.x
    mouse.y = e.y
}

onresize = (e) => { 
    canvas.width = e.target.innerWidth
    canvas.height = e.target.innerHeight
}

render()
