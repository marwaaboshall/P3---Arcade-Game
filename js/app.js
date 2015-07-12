//Enemy Class and functions
var Enemy = function(x,y) {
    this.x = x;
    this.y = y;

    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    
     this.x += Math.round(Math.random() * 150) * dt;
     if (this.x > 500) {
        this.x = -(Math.round(Math.random()*500));
    }
    this.collision();
};
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.collision = function(){
     if ((this.x - player.x < 60 && this.y - player.y < 50) &&
        (this.x - player.x > -60 && this.y - player.y > -50)) {
        player.reset();
        hitSound.play();
    }
};

//Player Class and functions
var Player = function(x,y){
    
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-cat-girl.png';
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.reset = function(){
    this.x = 200;
    this.y = 400;
};
//Handling input keys
Player.prototype.handleInput = function(keys){
    switch(keys){
        case 'left':
            if(this.x > 0)
                this.x -= 100;
            break;
        case 'right':
            if(this.x < 400)
                this.x += 100;
            break;
        case 'up':
            if(this.y > 40)
                this.y -= 90;
            else
                this.reset();
            break;
        case 'down':
            if(this.y < 400)
                this.y += 90;
            break;
        default:
            return;
    }
};
//Instantiating Player and Enemies objects
var player = new Player(200,400);
var enemyOne = new Enemy(Math.round(Math.random()*-230),65);
var enemyTwo = new Enemy(Math.round(Math.random()*-210),145);
var enemyThree = new Enemy(Math.round(Math.random()*-220),230);
var allEnemies = [enemyOne, enemyTwo, enemyThree];
//Adding background and hitting sound
var sound = new Audio("audio/frog.mp3");
sound.play();
sound.loop = true;

var hitSound = new Audio("audio/hit.mp3");

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
