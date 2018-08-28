var theGame;

window.onload = function() {

//Global Variables
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var theInt;

class Game{
    constructor () {
        this.player = new Player();
        this.obstacles = [];
    }

    obstacleCollisionCheck() {
        this.obstacles.forEach((eachObstacle) => {
            
            if ((this.player.x + this.player.width >= eachObstacle.x && this.player.x <= eachObstacle.x + eachObstacle.width) &&
                (this.player.y + this.player.height >= eachObstacle.y && this.player.y <= eachObstacle.y + eachObstacle.height)){
                //here is where we can remove points, or gain points, or bound off the boundaries
                }
        }) 
    }
    
    drawEverything() {
        this.player.drawPlayer();
        this.obstacles.forEach((oneObst) => {
            oneObst.drawObstacle();
        })
    }
    
    generateNewObstacle() {
        const theX = 750;
        const theY = Math.floor(Math.random()*275);
        this.obstacles.unshift(new Obstacle(theX, theY))
        this.obstacles[0].moveObstacle();
    }
}

class Player {
    constructor(){
        this.x = 40;
        this.y = 200;
        this.width = 80;
        this.height = 95;
        this.hp = 100;
        this.img = 'images/teemo-player.png';
    }
    
    drawPlayer() {
        var img = new Image();
        img.src = this.img;
        // img.onload = (() => {
        ctx.drawImage(img, this.x, this.y,this.width, this.height);
        // })
    }
        
        movePlayer(number) {
            ctx.clearRect(this.x, this.y, this.width, this.height );
            switch(number){
                case 37:
                if (this.x > 0) {
                    this.x -= 5;
                }break;
                case 39:
                if (this.x < canvas.width-75){
                    this.x += 5;
                }else{
                    this.x += 0;
                }
            }
            this.drawPlayer();
        }
        
        jumpPlayer(keyCode) {
            clearInterval(theInt);
            ctx.clearRect(this.x, this.y, this.width, this.height );
            if (keyCode === 32) {
                if (this.y > 50){
                    this.y -= 50;
                    this.drawPlayer();                
                    theInt = setInterval(() => {
                        if(this.y < 200){
                            ctx.clearRect(this.x, this.y, this.width, this.height);
                            this.y += 5    
                            this.drawPlayer(); 
                        }
                    }, 50);
                }else{
                    this.y=50;
                        this.drawPlayer();   
                    theInt = setInterval(() => {
                        if(this.y < 200){
                            ctx.clearRect(this.x, this.y, this.width, this.height);
                            this.y += 5    
                            this.drawPlayer(); 
                        }
                    }, 50);             
                }
            } 
        } 
}        

class Obstacle {
     constructor(theX, theY, theWidth, theHeight) {
        this.x = theX;
        this.y = theY;
        this.width = theWidth;
        this.height = theHeight;
        this.mush = 'images/mushroom-obstacle.png';
        this.sap = 'images/sapling-obstacle.png';
        this.image = ['images/mushroom-obstacle.png', 'images/sapling-obstacle.png']
        // this.type1 = 
        // this.type2 = 
    }
    
    drawObstacle() {
        var mush = new Image();
        var sap = new Image();
        mush.src = this.image[Math.floor(Math.random() * this.image.length)];
        mush.onload= (() => {
                ctx.drawImage(mush, 750, Math.floor(Math.random()*275), 45, 40);
                ctx.drawImage(sap, 750, Math.floor(Math.random()*275), 65, 50);
            })
    }
        
    moveObstacle() {
        setInterval(() => {
            this.x-=25;
        },50)
    }
}
    
let frames = 0;
    
function animate() {
    setInterval(() => {
        theGame.drawEverything();
        if(frames % 2500 === 0) theGame.generateNewObstacle();
        ctx.clearRect(0,0,800,400);
    theGame.obstacleCollisionCheck();
    frames++;
}, 1000)
}

//once this is working, use requestanimationframe instead of setinterval to stop the flickering

function startGame() {
    theGame = new Game();
}

document.getElementById("btn-start").onclick = function() {
    startGame();
    animate();
    theGame = new Game();
    player = new Player();
    player.drawPlayer();
    obstacles = new Obstacle();
    obstacles.drawObstacle();
}

document.onkeydown = function(e) {
    e.preventDefault();
    var move = e.keyCode;
    if (move === 37 || move === 39){
        player.movePlayer(move);
    }
    if (move === 32) {
        player.jumpPlayer(move);
    }
}

}