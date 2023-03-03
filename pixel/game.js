const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight

const render_queue = []
const mouse = {x: 0, y: 0, isDown: false}

let pixel_size = 30
const alt_radius = (pixel_size / 8) * 7
let ret

function random_color(){
    return `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)})`
}

class Pixel{
    constructor(x,y,s,id){
        this.x = x
        this.y = y
        this.size = s
        this.width = s
        this.height = s

        this.color = random_color()

        this.clickX = -1
        this.clickY = -1

        this.flashing = false

        this.id = id
    }
    
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.x, this.y, this.width, this.height)
        this.update()
    }

    update(){
        if(this.flashing)
            this.color = random_color()

        if(mouse.isDown == true){
            if(mouse.x > this.x - alt_radius && mouse.x <  this.x + alt_radius){
                if(mouse.y > this.y - alt_radius && mouse.y < this.y + alt_radius){
                    console.log("nearme ", this.id, " ", this.width)
                    this.flashing = true
                }
            }
        }
        else{
            this.flashing = false
        }
        if(this.width > this.size){
            this.width--
        }
        if(this.height > this.size){
            this.height--
        }

    }
}



function init(){
    render_queue.splice(0, render_queue.length)
    for(let j = 0; j < canvas.height; j+=pixel_size){
        for(let i = 0; i < canvas.width; i+=pixel_size){
            render_queue.push(new Pixel(i, j, pixel_size, i+j))
        }
    }
}

function render(){
    // console.log(mouse)
    c.clearRect(0,0,canvas.width, canvas.height)
    
    for(r of render_queue){
        // r.flashing = true
        r.draw()
    }
    ret = requestAnimationFrame(render)
}

function pause_render(){
    // console.log(mouse)
    for(r of render_queue){
        // r.flashing = false
        r.draw()
    }
    ret = requestAnimationFrame(pause_render)
}

onmousemove = (e) => {
    mouse.x = e.x
    mouse.y = e.y
}

onmousedown = (e) => {
    mouse.isDown = true
    cancelAnimationFrame(ret)
    ret = requestAnimationFrame(pause_render)
}

onmouseup = (e) => {
    mouse.isDown = false
    cancelAnimationFrame(ret)
    ret = requestAnimationFrame(render)
}

onresize = (e) => { 
    canvas.width = e.target.innerWidth
    canvas.height = e.target.innerHeight
    init()
}

init()
render()
