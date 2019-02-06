const levelCounter = document.querySelector('.level-counter');
const highestScoreAchieved = document.querySelector('.highest-level');
let currentLevel = 1;
let currentScore = 0;
levelCounter.innerHTML = currentLevel;
highestScoreAchieved.innerHTML = currentScore;

class Enemy {
  constructor (x,y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
  }
  
  update (dt) {
    // The speed will increase as the player avances through the levels
    // this.dt = dt * Math.floor((Math.random() * 1) + 100);
    this.dt = dt * Math.floor((Math.random() * 1) + 50);
    let speed = 10;
    speed = currentLevel;
    this.x += (speed * this.dt);

    // Once the 'enemy' disappears from the board, it returns to its initial position and the speed resets.
    if (this.x >= 500) {
      this.x = this.initialX;
      this.y = this.initialY;
    }

    // This will detect the collision on each 'enemy'. If the 'bug' collides against the player, 
    // then this will return the player back to its initial position.
    // The game will reset to its 'Level 1' values (player position, enemies' speed and current level displayed)
    if (player.x > this.x - 70 && player.x < this.x + 80 && player.y > this.y - 60 && player.y < this.y + 60) {
      player.x = 202;
      player.y = 380;
      console.log('Game Over');
      currentLevel = 1;
      levelCounter.innerHTML = currentLevel;
      
      if (currentScore > currentLevel) {
        highestScoreAchieved.textContent = currentScore;
      } 
      
      console.log(`New High Score = ${currentScore}`)
      currentScore = 0; 
    }
  }
  render() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y)}
}

class Player {
  constructor (x=202,y=380) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
    this.initialX = x;
    this.initialY = y;
  }

  // Boundaries are set. 
  // Also, once the player reaches the blue blocks, the character will return
  // to its initial position 
  update() {
    if (this.x < 0) {
      this.x = 0
    } else if (this.x > 400) {
      this.x = 400
    } else if (this.y > 400) {
      this.y = 380
    } else if (this.y < 0) {
      // console.log("You win this time.")
      this.x = this.initialX;
      this.y = this.initialY;
      currentLevel++;
      currentScore++;
      let newLevel = currentLevel;
      levelCounter.innerHTML = newLevel;
      console.log(`Current Score = ${currentScore}`);
    }
  }

  render() {ctx.drawImage(Resources.get(this.sprite), this.x, this.y)}

  // When a certain 'key' on EvenListener is pressed, 
  // then the character will move a certain amount of pixels on the board
  handleInput(key) {
    if (key === 'up') {
      this.y -= 80
    } else if (key === 'down') {
      this.y += 80 
    } else if (key === 'right') {
      this.x += 101
    } else if (key === 'left') {
      this.x -= 101
    }
  }
}

// Enemy instances.
let enemy1 = new Enemy(-100,60);
let enemy4 = new Enemy(-370,60);
let enemy2 = new Enemy(-250,140);
let enemy3 = new Enemy(-600,140);
let enemy5 = new Enemy(-520,220);
let enemy6 = new Enemy(-170,220);

// allEnemies Array
let allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

let player = new Player();

document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});

/* 
Y-Coordinates: +80
  Row 1: 60
  Row 2: 140
  Row 3: 220
  Row 4: 300
  Row 5: 380

X-Coordinates: +101
  Column 1: 0
  Column 2: 101
  Column 3: 202
  Column 4: 303
  Column 5: 404
*/