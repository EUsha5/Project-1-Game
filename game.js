
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
        this.x = 
        this.y = 
        this.width = 
        this.height =
        this.img = [0, 1];
        this.type = [0, 1];

     }
 }

window.onload = function() {
    player = new Player();
    player.drawPlayer();

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
