const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const gravity = 9.8

class Player {
    constructor() {
        this.width = 100
        this.height = 100
        this.position = { x: (canvas.width/2) - (this.width/2), y : (canvas.height/2) - (this.height/2) }
        this.velocity = { x: 0, y: 1 }
    }

    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.y += this.velocity.y
        if(this.position.y + this.height < canvas.height)
            this.position.y += gravity
        // this.position.x++
    }
}

const player = new Player();

function animate() {   
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    window.requestAnimationFrame(animate)
}

animate()