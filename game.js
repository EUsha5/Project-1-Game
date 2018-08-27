
//Global Variables

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var theInt;

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
        img.onload = (() => {
        ctx.drawImage(img, this.x, this.y,this.width, this.height);
        })
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

 class Obstacles {
     constructor() {
        // this.width = 50;
        // this.height = 45;
        this.img1 = 'images/mushroom-obstacle.png';
        this.img2 = 'images/sapling-obstacle.png';
        // this.type1 = 
        // this.type2 = 
     }
 
        drawMushroomObstacle() {
            var img1 = new Image();
            img1.src = this.img1;
            img1.onload= (() => {
                ctx.drawImage(img1, 500, 262, 35, 30);
            })
        }

        drawSaplingObstacle() {
            var img2 = new Image();
            img2.src = this.img2;
            img2.onload= (() => {
                ctx.drawImage(img2, 600, 250, 50, 45);
            })
        }

//      moveObstacles() {
//         ctx.clearRect(this.x, this.y, this.width, this.height );
        
//         if (game is active - start button clicked) {
//             drawMushroomObstacle && drawSaplingObstacle 
//             move both obstacles along x axis from max-x to min-x on an infinite loop, at randomly selected y-axis points

//         }

//         this.drawMushroomObstacle();
//         this.drawSaplingObstacle();
//     }
// }
 
 }

window.onload = function() {
    player = new Player();
    player.drawPlayer();
    obstacles = new Obstacles();
    obstacles.drawMushroomObstacle();
    obstacles.drawSaplingObstacle();
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
