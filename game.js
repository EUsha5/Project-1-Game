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
            }
            if(eachObstacle.x === -75) {
                this.obstacles.pop(eachObstacle);
            }
        }) 
    }
    
    drawEverything() {
        this.player.drawPlayer();
        this.obstacles.forEach((oneObsticle) => {
            oneObsticle.drawObstacle();
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
        this.img = 'images/teemo-player.png';
        this.score = 0;
        this.health = 100;
    }
    
    drawPlayer() {
        var img = new Image();
        img.src = this.img;
        // img.onload = (() => {
        ctx.drawImage(img, this.x, this.y,this.width, this.height);
        // })
    }
        
        movePlayer(number) {
            // ctx.clearRect(this.x, this.y, this.width, this.height );
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
            // this.drawPlayer();
        }
        
        jumpPlayer(keyCode) {
            clearInterval(theInt);
            // ctx.clearRect(this.x, this.y, this.width, this.height );
            if (keyCode === 32) {
                if (this.y > 50){
                    this.y -= 50;
                    // this.drawPlayer();                
                    theInt = setInterval(() => {
                        if(this.y < 200){
                            // ctx.clearRect(this.x, this.y, this.width, this.height);
                            this.y += 5    
                            // this.drawPlayer(); 
                        }
                    }, 50);
                }else{
                    this.y=50;
                        // this.drawPlayer();   
                    theInt = setInterval(() => {
                        if(this.y < 200){
                            // ctx.clearRect(this.x, this.y, this.width, this.height);
                            this.y += 5    
                            // this.drawPlayer(); 
                        }
                    }, 50);             
                }
            } 
        } 
}        

class Obstacle {
     constructor(theX, theY) {
        this.x = theX;
        this.y = theY;
        this.width = 50;
        this.height = 50;
        this.image = ['images/mushroom-obstacle.png', 'images/sapling-obstacle.png']
        this.imgsrc = this.image[Math.floor(Math.random() * 2)]
    }
    
    drawObstacle() {
        var theImage = new Image();

        theImage.src = this.imgsrc;

        theImage.onload= (() => {
                ctx.drawImage(theImage, this.x, this.y, 45, 40);
            })
    }
        
    moveObstacle() {
        setInterval(() => {
            this.x-=5;
        }, 50);
    }
}
    
let frames = 0;
let lastTime;
   
function animate() {
    setInterval(() => {
        ctx.clearRect(0,0,800,400);
        theGame.drawEverything();
        if(frames % 10 === 0) theGame.generateNewObstacle();
        theGame.obstacleCollisionCheck();
        frames++;
}, 100)
}

function main() {
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;

    lastTime = now;

    // console.log(dt)
    //need to slice '%' when less than 3 integers
        let bgPos = canvas.style.backgroundPositionX.slice(0,-1);
        canvas.style.backgroundPositionX = `${bgPos-1}%`;
    window.requestAnimationFrame(main);
}

    //once this is working, use requestanimationframe instead of setinterval to stop the flickering

function startGame() {
    theGame = new Game();
}

document.getElementById("btn-start").onclick = function() {
    startGame();
    animate();
    main();
}

document.onkeydown = function(e) {
    e.preventDefault();
    var move = e.keyCode;
    if (move === 37 || move === 39){
        theGame.player.movePlayer(move);
    }
    if (move === 32) {
        theGame.player.jumpPlayer(move);
    }
}

}