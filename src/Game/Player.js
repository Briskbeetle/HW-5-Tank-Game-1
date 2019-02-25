const Phaser = require('phaser');

class Player {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.moveSpeed = 100;

    this.rotSpeed = 2; 
    this.forwardRot = Math.PI / 2; // pointing down in radians


    // Geometry for remembering
    this.baseGeo = [ // these points make up a tank!
      new Phaser.Geom.Point(-17, 10),
      new Phaser.Geom.Point(-8, 20),
      new Phaser.Geom.Point(8, 20),
      new Phaser.Geom.Point(17, 10),
      new Phaser.Geom.Point(17, -20),
      new Phaser.Geom.Point(-17, -20),
      new Phaser.Geom.Point(-17, 10)
    ];
  }

  setX(newX) {
    this.x = newX;
  }
  
  setY(newY) {
    this.y = newY;
  }

  update(deltaTime, keys) {// generates stuff every frame
    const forwardX = -Math.sin(this.forwardRot); // because we are facing down and NOT to the we right we will use SIN instead of COS
    const forwardY = Math.cos(this.forwardRot);
    // Player Movement
    if (keys.left.isDown) {
      //this.x -= this.moveSpeed * deltaTime / 1000; 
      this.forwardRot -= this.rotSpeed * deltaTime / 1000;

    }
    if (keys.right.isDown) {
      //this.x += this.moveSpeed * deltaTime / 1000; 
      this.forwardRot += this.rotSpeed * deltaTime / 1000;

    }
    if (keys.up.isDown) {
      // this.y -= this.moveSpeed * deltaTime / 1000;
      this.x += this.moveSpeed * forwardX * deltaTime / 1000;
      this.y += this.moveSpeed * forwardY * deltaTime / 1000;
    }
    if (keys.down.isDown) {
      // this.y += this.moveSpeed * deltaTime / 1000;
      this.x -= this.moveSpeed * forwardX * deltaTime / 1000;
      this.y -= this.moveSpeed * forwardY * deltaTime / 1000;
    }
  }

  draw(graphics) {
    // if(condition make red)
    graphics.fillStyle(0xff0000, 1.0);
    graphics.save();
    graphics.translate(this.x, this.y);
    graphics.rotate(this.forwardRot);
    // translate then rotate (the axis of the world) then scale
   // graphics.fillCircle(0, 0, this.radius); // ciricle player
    graphics.strokePoints(this.baseGeo);// tank player
    // graphics.fillPoint() // check phaser api for out line help
    graphics.fillCircle(0,0, 12);
    graphics.fillRect(-5, 0, 10, 25);
    graphics.restore();
  }
}

module.exports = Player;
