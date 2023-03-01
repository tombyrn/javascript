const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 9.8

const SQUARE_AMT = 500

const mouse = {x: 0, y: 0}

class Square {
    constructor(x, y) {
        this.width = Math.random() * 50
        this.height = Math.random() * 50
        this.position = { x: Math.random() * canvas.width, y : Math.random() * canvas.height }
        this.velocity = { x: 0, y: 1 }
        this.color = `rgb(
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)},
            ${Math.floor(Math.random() * 255)})`
        this.direction = Math.random() >  0.5
    }

    draw(){
        // ctx.fillStyle = 
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.width, 0, 360)
        ctx.fill()
    }

    update(){
        this.draw()
        if(this.position.x < mouse.x + 50 && this.position.x > mouse.x - 50 && this.position.y < mouse.y + 50 && this.position.y > mouse.y - 50){
            this.direction ? this.position.x+=5 : this.position.x-=5
            this.direction ? this.position.y+=5 : this.position.y-=5
        }
    }
}


const squareList = []
for(let i = 0; i < SQUARE_AMT; i++){
    squareList.push(new Square())
}

function animate() {   
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i = 0; i < SQUARE_AMT; i++){
        squareList[i].update()
    }

    window.requestAnimationFrame(animate)
}

animate()

onmousemove = (e) => {
    mouse.x = e.x
    mouse.y = e.y
}