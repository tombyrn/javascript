const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = innerWidth
canvas.height = innerHeight

seed_amt = 50

const mouse = {x: 0, y: 0}

class Circle{
    constructor(x,y){
        this.x = x
        this.y = y

        this.defaultR = 50
        this.radiusX = 50
        this.radiusY = 50

        this.rotation = Math.PI / 4
        this.startAngle = 0
        this.endAngle = 2 * Math.PI
        this.direction = Math.random() > 0.5

        this.color = `rgb(
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)})`

        this.disposed = 0
    }
    
    draw(){
        
        c.beginPath();
        c.fillStyle = this.color
        c.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
        c.fill();
        // c.stroke();
        
        this.update()
        this.dispose()
    }

    dispose(){
        if((this.x + this.radiusX < 0 && this.y + this.radiusY < 0) ||(this.x - this.radiusX > canvas.width && this.y - this.radiusY > canvas.height))
            this.disposed
    }

    update(){
        this.direction ? this.x++ : this.x--
        this.direction ? this.y++ : this.y--

        if(mouse.x < this.x + 50 && mouse.x > this.x - 50 && mouse.y < this.y + 50 && mouse.y > this.y - 50){
            // this.direction ? this.radiusY++ : this.radiusY--
        }
        if(this.radiusX < this.defaultR)
            this.radiusX++
        if(this.radiusX > this.defaultR)
            this.radiusX--
        if(this.radiusY < this.defaultR)
            this.radiusY++
        if(this.radiusY > this.defaultR)
            this.radiusY--
        
    }
}


const render_queue = []

for(let i = 0; i < seed_amt; i++){
    render_queue.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height))
}

function render(){
    c.clearRect(0,0,canvas.width, canvas.height)
    for(let i = 0; i < render_queue.length; i++){
        const circle = render_queue[i]
        circle.draw()
        if(circle.disposed){
            render_queue.splice(i, 1);
            // i--
            render_queue.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height))
        }

    }
    requestAnimationFrame(render)
}

onmousemove = (e) => {
    mouse.x = e.x
    mouse.y = e.y
}

render()
