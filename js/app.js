
// in progress /////////////
var lives = function(life) {
     life = life;
     this.sprite = 'images/heart.png';

}
/////////////////////////////////////////////////////////////


lives.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), 100, 100);
};
/////////////////////////////////////////////////////////////
/// sets the players sprite and input for movement values////
/////////////////////////////////////////////////////////////
var Player = function(lr, ud, move) {
    this.lr = lr;
    this.ud = ud;
    this.move = move;
    this.sprite = 'images/blob.png';
    score = 0;
};
//////////////////////////////////////////////////
/// stops the player from moving out of bounds ///
//////////////////////////////////////////////////
Player.prototype.update = function() {
    if (this.ud > 380) { this.ud = 380; }
    if (this.lr > 400) { this.lr = 400; }
    if (this.lr < 0)   { this.lr = 0; }
//////////////////////////////////
/// Made it to the other side? ///
//////////////////////////////////
    if (this.ud < 0) { 
        this.lr = 200; 
        this.ud = 380;
//////////////////////////////////
    score +=1;
    console.log("your score is " + score);
    document.querySelector('#score').innerHTML = (score);
    

    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.lr, this.ud);
};
//////////////////////////////////////////////////
/// thanks to stack overflow for keypress code //////////////////////////////////////////////
/// https://stackoverflow.com/questions/5597060/detecting-arrow-key-presses-in-javascript ///
/////////////////////////////////////////////////////////////////////////////////////////////
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.lr -= this.move + 50;
            break;
        case 'up':
            this.ud -= this.move + 30;
            break;
        case 'right':
            this.lr += this.move + 50;
            break;
        case 'down':
            this.ud += this.move + 30;
            break;
    }
};
////////////////////////////////////////////////
/// enemies position and speed via argumnets ///
////////////////////////////////////////////////
var Enemy = function(lr, ud, speed) {
    this.lr = lr;
    this.ud = ud;
    this.speed = speed;

//////////////////////////////////////////////
    this.sprite = 'images/spaceship.png';
//////////////////////////////////////////////
};
/////////////////////////////////////////////////
/// set enemies speed and place on the canvas ///
/////////////////////////////////////////////////
Enemy.prototype.update = function(dt) {
    this.lr += this.speed * dt;
    if (this.lr > 550) {
        this.lr = -100;
        this.speed = 300 + Math.floor(Math.random() * 2700);
    }
////////////////////////////////////////////
/// has player collided with an enemies ///
///////////////////////////////////////////
    if ((((player.lr <= this.lr + 60)
        &&
        (player.lr + 37 >= this.lr)
        &&
        (player.ud < this.ud + 25)
        &&
        (player.ud  + 30 >= this.ud))))
    {
        player.lr = 200;
        player.ud = 380;
        lives -1;
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.lr, this.ud);
};

var allEnemies = [];
//////////////////////////////////////////////////////
/// Position where the enemies will be created ///
//////////////////////////////////////////////////////
var enemyPos = [60, 140, 220];
var player = new Player(200, 400, 50);
var enemy;

enemyPos.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 1000));
    allEnemies.push(enemy);
});

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});