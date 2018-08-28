//canvas
var canvas = document.getElementById('canvas')
var ctx = canvas.getContext('2d')
//variables
var intervalo
var frames = 0
var enemies=[]
//constructores
function Background(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.imagen = new Image()
    this.imagen.src = "background.jpg"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}

function Cat(){
    this.x = canvas.width / 3
    this.y = canvas.height - 100
    this.width = 100
    this.height = 100
    this.imagen = new Image()
    this.imagen.src = "cat.png"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }

    this.checkIfTouch = function(enemy){
      /*  (this.x < enemy.x + enemy.width) &&
                (this.x + this.width > enemy.x) &&
                (this.y < enemy.y + enemy.height) &&
                (this.y + this.height > enemy.y);*/
            if(this.x +50 > enemy.x && this.x+50 < enemy.x+50
                && this.y+50 < enemy.y+50 && this.y+50> enemy.y
               ){
                return true
            }
        }
}

function Enemy(x){
    this.x = x
    this.y = 0
    this.width = 50
    this.height = 50
    this.imagen = new Image()
    this.imagen.src = "heart.png"
    this.imagen.onload = function(){
        this.draw()
    }.bind(this)
    
    this.draw = function(){
        this.y++
        ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height)
    }
}
//instancias
var board = new Background()
var cat = new Cat()
//main functions
function update(){
    frames++
    ctx.clearRect(0,0,canvas.width,canvas.height) //x,y,alto,ancho
    board.draw()
    cat.draw()
    generateEnemy()
    drawEnemies()
    checkCollition()
} 

function start(){
    intervalo = setInterval(update, 1000/60)
}

function gameOver(){
    clearInterval(intervalo)
    ctx.font = "50px Avenir"
    ctx.fillStyle = "white"
    ctx.fillText('GAME OVER',100,100)
}

//aux functions
function generateEnemy(){
    if(frames % 100 === 0){
        const x = Math.floor(Math.random() * 512)
        enemies.push(new Enemy(x))
    }
}

function drawEnemies(){
    enemies.forEach(function(enemy){
        enemy.draw()
    })
}

function checkCollition(){
    enemies.forEach(enemy=>{
        if(cat.checkIfTouch(enemy)){
            gameOver()
        }
    })
}
//listeners
document.addEventListener('keydown', function(e){
    if(e.keyCode === 37){
        if(cat.x <= 0) return
        cat.x -= 50;
    }
    if(e.keyCode === 39){
        if(cat.x >= canvas.width-100) return
        cat.x += 50;
    }
    
})


start()