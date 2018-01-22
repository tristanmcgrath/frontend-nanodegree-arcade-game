var allEnemies = [];

// Enemies our player must avoid
var Enemy = function() {
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;    //starting position is just off screen to left
    this.y;           //this.y will be set using below for loop, different for each instance
    this.speed = 200 + (Math.random()*300); //speed property used by update in conjunction with dt in order to update enemy position
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x > 5*101) {   //when enemy instance exits right side of screen, reset x position to left of screen
      this.x = -101;
    } else {
    this.x += dt*this.speed;  //set enemy's position based on its speed property and the time elapsed
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 2*101;
    this.y = (5*83) - 10;
    this.xMove = 0; //xMove and yMove determine what number of spaces and in what direction player instance should move; incremented by player.handleInput()
    this.yMove = 0; //then used by player.update() to determine move location
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//update the player's position evertime player.update() is invoked by engine.js
Player.prototype.update = function() {

    if(this.xMove != 0 && !(this.x === 0 && this.xMove < 0) && !(this.x === (4*101) && this.xMove > 0)) { //keeps player from moving off screen horizontally
      this.x += this.xMove*101;     //this moves the player horizontally when allowed horizontal move is made
    } else if (this.xMove > 0) {
      this.x = 4*101;               //player attempting to move outside arena to right will be set to arena-max-right
    } else if (this.xMove < 0) {
      this.x = 0;                   //player attempting to move outside arena to left will be set to arena-max-left
    }
    this.xMove = 0;  //reset xMove to 0 after move is made

    if(this.yMove != 0 && !(this.y === -10 && this.yMove > 0) && !(this.y === ((5*83) - 10) && this.yMove < 0)) { //keeps player from moving off screen vertically
      this.y -= this.yMove*83;       //this moves the player vertically when allowed vertical move is made
    } else if (this.yMove > 0) {
      this.y = -10;                 //player attempting to move outside arena above will be set to arena-min-height (y = -10)
    } else if (this.yMove < 0) {
      this.y = (5*83) - 10;          //player attempting to move outside arena below will be set to arena-max-height (y = 5*83 -10)
    }
    this.yMove = 0;  //reset yMove to 0 after move is made

};

//this function is invoked by keystroke event listener below and takes in the keystrokes name (e.g. 'right') as an argument.
//based on keystroke name, xMove or yMove parameter is incremented which is then used by player.update() to figure out where to move player
Player.prototype.handleInput = function(key) {

  if (key === 'left') {
    this.xMove -= 1;
  } else if (key === 'right') {
    this.xMove += 1;
  } else if (key === 'up') {
    this.yMove += 1;
  } else if (key === 'down') {
    this.yMove -= 1;
  }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
for (i = 1; i<4; i++) {
  var enemy = new Enemy();
  enemy.y = (i*83) - 20;
  allEnemies.push(enemy);
}

// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    if(allowedKeys.hasOwnProperty(e.keyCode)) {    //prevent invocation of player's handleInput method upon illegitimate key stroke
      player.handleInput(allowedKeys[e.keyCode]);
    }
});
