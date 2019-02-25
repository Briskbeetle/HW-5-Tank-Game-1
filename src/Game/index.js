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

const p1 = new Player(phaserConfig.width / 2, phaserConfig.height / 2, 10);

const bullets = []; // an array of objects we can call from later
for(let i = 0; i < 20; i++) { // have only 20 bullets on screen at one time
  bullets.push(new Bullet());
}
// fire bullet 
let wasLastFrameSpaceDown = false;

const enemies = [];
for(let i = 0; i < 1; i++) { // have only 4 enemies on screen at one time
  enemies.push(new Enemy());
}

// Global Phaser Vars
let game;
let graphics;
let keys;

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
  keys = this.input.keyboard.createCursorKeys();
  graphics = this.add.graphics({
    fillStyle: { color: 0xeeeeee },
    lineStyle: { width: 3, color: 0xffffff },
  });
}

funciton getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let spawnTimer = 5000; // every 5 sec spawn a new enemy

function update(totalTime, deltaTime) {
  p1.update(deltaTime, keys);

  // Keep player on screen
  if (p1.x > phaserConfig.width + 5) {
    p1.setX(0);
  }

  if (p1.x < -5) {
    p1.setX(phaserConfig.width - 5);
  }

  if (p1.y > phaserConfig.height + 5) {
    p1.setY(0);
  }

  if (p1.y < -5) {
    p1.setY(phaserConfig.height - 5);
  }
  
  // spawning bullets
  if(keys.space.isDown && !wasLastFrameSpaceDown)
  {
    // spawn bullet
    const newBullet = bullets.find((b) => {return !b.isActive;});
    if (newBullet) {
      newBullet.activate(p1.x, p1.y, p1.forwardRot);
    }
     // bullets[0].activate(p1.x, p1.y, p1.forwardRot);

  }
  
  
  // spawn a new enemy after 5 sec
  const newEnemy = enemies.find((e) => {return !e.isActive;});
  if(newEnemy){
    newEnemy.activate(getRandomInt(800), getRandomInt(600), getRandomInt(359));
  }
 // if(isCircleCollision())

  wasLastFrameSpaceDown = keys.space.isDown;
  // update bullets
  bullets.forEach((b) => {b.update(deltaTime); });

  // Always clear at the top of update
  graphics.clear();
  p1.draw(graphics);
  bullets.forEach((b) => { b.draw(graphics); });



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
