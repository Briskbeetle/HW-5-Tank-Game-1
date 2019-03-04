const Phaser = require('phaser');
//Import "Actors"
const Player = require('../Player');
const Bullet = require('../Bullet');
const Enemy = require('../Enemy');

function isCircleCollision(c1, c2) {
    // Get the distance between the two circles
    const distSq = (c1.x - c2.x) * (c1.x - c2.x) + (c1.y - c2.y) * (c1.y - c2.y);
    const radiiSq = (c1.radius * c1.radius) + (c2.radius * c2.radius);
  
    // Returns true if the distance btw the circle's center points is less than the sum of the radii
    return (distSq < radiiSq);
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

class MainScene extends Phaser.Scene {
   constructor() { 
    super('MainScene'); 
   }

   create(){ 
    this.didFirstSpawn = false;
    this.keys = { left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT), 
        right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT), 
        up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP), 
        down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN), 
        space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
         a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
         d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), }

    this.graphics = this.add.graphics({
        fillStyle: { color: 0xeeeeee },
        lineStyle: { width: 3, color: 0xffffff },
      });

    this.p1 = new Player(this.game.config.width / 2, this.game.config.height / 2, 30);

    this.bullets = []; // an array of objects we can call from later
    for(let i = 0; i < 20; i++) { // have only 20 bullets on screen at one time
      this.bullets.push(new Bullet());
    }
    this.wasLastFrameSpaceDown = false;

    this.enemies = [];
    for(let i = 0; i < 5; i++) {
        this.enemies.push(new Enemy());
    }
    this.spawnTimer = 2000; // every 5 sec spawn a new enemy

   }
 update(_, deltaTime) {

    // update bullets
    this.bullets.forEach((b) => {b.update(deltaTime); });
    this.p1.update(deltaTime, this.keys);
  
    // Keep player on screen
    if (this.p1.x > this.game.config.width + 20) {
      this.p1.setX(0);
    }
  
    if (this.p1.x < -20) {
      this.p1.setX(this.game.config.width - 20);
    }
  
    if (this.p1.y > this.game.config.height + 20) {
      this.p1.setY(0);
    }
  
    if (this.p1.y < -20) {
      this.p1.setY(this.game.config.height - 20);
    }
    
    // spawning bullets
    if(this.keys.space.isDown && !this.wasLastFrameSpaceDown)
    {
      // spawn bullet
      this.newBullet = this.bullets.find((b) => {return !b.isActive;});
      if (this.newBullet) {
        this.newBullet.activate(this.p1.x+(-Math.sin(this.p1.cannonRot)*23), this.p1.y+(Math.cos(this.p1.cannonRot)*15), this.p1.cannonRot);
        //const forwardX = -Math.sin(this.forwardRot);
        //const forwardY = Math.cos(this.forwardRot);
  
      }
       // bullets[0].activate(p1.x, p1.y, p1.forwardRot);
    }
    this.wasLastFrameSpaceDown = this.keys.space.isDown;

    this.bullets.forEach((bullet) =>{
      if(bullet.isActive){
        if(bullet.x > this.game.config.width + 20)
        {
          bullet.deactivate();
        }
        if(bullet.x < -20)
        {
          bullet.deactivate();
        }
        if(bullet.y > this.game.config.height + 20)
        {
          bullet.deactivate();
        }
        if(bullet.y < -20)
        {
          bullet.deactivate();
        }
        }});
  
    
    // spawn a new enemy after 5 sec
    this.spawnTimer -= deltaTime;
    if(this.spawnTimer <= 0)
    {
      this.newEnemy = this.enemies.find((e) => {return !e.isActive;});
      if(this.newEnemy){
        this.newEnemy.activate(getRandomInt(800), getRandomInt(600), getRandomInt(359));
        this.spawnTimer = 1000;
      }
    }
    
    this.bullets.forEach((bullet) =>{
      if(bullet.isActive){
        this.enemies.forEach((enemy) =>{
          if(isCircleCollision(bullet, enemy)){
            enemy.deactivate();
            bullet.deactivate();
          }
        });
      }
    });
  
    this.enemies.forEach((enemy) =>{
      if(isCircleCollision(this.p1, enemy)){
        enemy.deactivate();
      }
    });

    this.graphics.clear();
    this.p1.draw(this.graphics);
    this.bullets.forEach((b) => { b.draw(this.graphics); });
    this.enemies.forEach((e) => { e.draw(this.graphics); });
}}

module.exports = MainScene;