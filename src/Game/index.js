// Import outside libraries
const Phaser = require('phaser');
const Player = require('./Player');
const Bullet = require('./Bullet');
const Enemy = require('./Enemy');

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
};

const p1 = new Player(phaserConfig.width / 2, phaserConfig.height / 2, 30);

const bullets = []; // an array of objects we can call from later
for(let i = 0; i < 20; i++) { // have only 20 bullets on screen at one time
  bullets.push(new Bullet());
}
// fire bullet 
let wasLastFrameSpaceDown = false;

const enemies = [];
for(let i = 0; i < 5; i++) {
  enemies.push(new Enemy());
}

// Global Phaser Vars
let game;
let graphics;
let keys;
let didFirstSpawn = false;

/**
 * Helper function for checking if two circles are colliding
 * 
 * @param {object} c1 : must have x, y, and radius property
 * @param {object} c2 : must have x, y, and radius property
 */
function isCircleCollision(c1, c2) {
  // Get the distance between the two circles
  const distSq = (c1.x - c2.x) * (c1.x - c2.x) + (c1.y - c2.y) * (c1.y - c2.y);
  const radiiSq = (c1.radius * c1.radius) + (c2.radius * c2.radius);

  // Returns true if the distance btw the circle's center points is less than the sum of the radii
  return (distSq < radiiSq);
}

// Phaser setup
function create () {
  keys = { left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT), 
    right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT), 
    up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP), 
    down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN), 
    space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
     a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
     d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), }

  graphics = this.add.graphics({
    fillStyle: { color: 0xeeeeee },
    lineStyle: { width: 3, color: 0xffffff },
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let spawnTimer = 2000; // every 5 sec spawn a new enemy

function update(totalTime, deltaTime) {
  p1.update(deltaTime, keys);

  // Keep player on screen
  if (p1.x > phaserConfig.width + 20) {
    p1.setX(0);
  }

  if (p1.x < -20) {
    p1.setX(phaserConfig.width - 20);
  }

  if (p1.y > phaserConfig.height + 20) {
    p1.setY(0);
  }

  if (p1.y < -20) {
    p1.setY(phaserConfig.height - 20);
  }
  
  // spawning bullets
  if(keys.space.isDown && !wasLastFrameSpaceDown)
  {
    // spawn bullet
    const newBullet = bullets.find((b) => {return !b.isActive;});
    if (newBullet) {
      newBullet.activate(p1.x+(-Math.sin(p1.cannonRot)*23), p1.y+(Math.cos(p1.cannonRot)*15), p1.cannonRot);
      //const forwardX = -Math.sin(this.forwardRot);
      //const forwardY = Math.cos(this.forwardRot);

    }
     // bullets[0].activate(p1.x, p1.y, p1.forwardRot);

  }
    
  bullets.forEach((bullet) =>{
    if(bullet.isActive){
      if(bullet.x > phaserConfig.width + 20)
      {
        bullet.deactivate();
      }
      if(bullet.x < -20)
      {
        bullet.deactivate();
      }
      if(bullet.y > phaserConfig.height + 20)
      {
        bullet.deactivate();
      }
      if(bullet.y < -20)
      {
        bullet.deactivate();
      }
      }});

  
  // spawn a new enemy after 5 sec
  spawnTimer -= deltaTime;
  if(spawnTimer <= 0)
  {
    const newEnemy = enemies.find((e) => {return !e.isActive;});
    if(newEnemy){
      newEnemy.activate(getRandomInt(800), getRandomInt(600), getRandomInt(359));
      spawnTimer = 1000;
    }
  }
  
  bullets.forEach((bullet) =>{
    if(bullet.isActive){
      enemies.forEach((enemy) =>{
        if(isCircleCollision(bullet, enemy)){
          enemy.deactivate();
          bullet.deactivate();
        }
      });
    }
  });

  enemies.forEach((enemy) =>{
    if(isCircleCollision(p1, enemy)){
      enemy.deactivate();
    }
  });
  

  wasLastFrameSpaceDown = keys.space.isDown;
  // update bullets
  bullets.forEach((b) => {b.update(deltaTime); });

  // Always clear at the top of update
  graphics.clear();
  p1.draw(graphics);
  bullets.forEach((b) => { b.draw(graphics); });
  enemies.forEach((e) => { e.draw(graphics); });



}



phaserConfig.scene = {
  create: create,
  update: update
}
  
// Exported Module so game can be initialized elseware
const GameManager = {
  init: () => {
    game = new Phaser.Game(phaserConfig);
  },
};

module.exports = GameManager;
