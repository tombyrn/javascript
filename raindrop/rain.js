const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight

const mouse = {x: 0, y: 0}

const delay_ms = 1000

function random_color(){
    return `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)})`
}

function get_mouse_dist(x, y){
    const a = Math.abs(mouse.x - x)
    const b = Math.abs(mouse.y - y)
    const c = Math.sqrt((a*a) + (b*b))
    return c
}

class Drop{
    constructor(x,y){
        // ellipse variables
        this.x = x
        this.y = y

        this.radius = 3

        this.startAngle = 0
        this.endAngle = 2*Math.PI

        this.counterclockwise = false

        // behavior variables
        this.runner = Math.random() < 0.5 ? {is_runner: false} : {is_runner: true, run_length: this.y + Math.floor(Math.random() * canvas.height)}
    }
    
    draw(){
        c.fillStyle = 'dodgerblue'
        c.strokeStyle = 'dodgerblue'
        c.beginPath()
        c.arc(
            this.x,this.y,
            this.radius,
            this.startAngle, this.endAngle,
            this.counterclockwise
        )
        c.stroke()
        c.fill()
        this.update()
    }

    update(){
        if(this.runner.is_runner){
            this.y+=0.2
            this.x+= Math.random() < 0.5 ? Math.random() : -1 * Math.random()
            if(this.y >= this.runner.run_length)
                this.runner.is_runner = !this.runner.is_runner
        }

        const dist_from_mouse = get_mouse_dist(this.x, this.y)
        if(dist_from_mouse < 50){
            mouse.x > this.x ? this.x-- : this.x++
            mouse.y > this.y ? this.y-- : this.y++
        }
    }

}

const queue = []
const drop2 = new Drop(canvas.width/2, canvas.height/2)
queue.push()

function render(){
    // c.clearRect(0, 0, canvas.width, canvas.height)
    for(drop of queue){
        drop.draw()
    }
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

setInterval(() => {
    queue.push(new Drop(Math.random() * canvas.width, 
                        Math.random() * canvas.height))
}, delay_ms)