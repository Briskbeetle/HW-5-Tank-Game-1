class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.moveSpeed = 250;
    this.forwardRot = 0; // direction it is facing
    this.isActive = false;// initializing bullts to be asleep
    this.deathTimer = 0; // 

    this.cannonGeo = [
      new Phaser.Geom.Point(-5, 18),
      new Phaser.Geom.Point(0, 25),
      new Phaser.Geom.Point(5, 18),
      new Phaser.Geom.Point(5, 0),
      new Phaser.Geom.Point(-5, 0),
      new Phaser.Geom.Point(-5, 18)
    ]
  }

activate(x,y, forwardRot){
    this.x = x;
    this.y = y;
    this.forwardRot = forwardRot;
    this.isActive = true; // arm the bullet
    this.deathTimer = 5000; 

}

deactivate(){ // when timer is done and off screen
  this.isActive = false;
}

  update(deltaTime, keys) {// generates stuff every frame
    if(this.isActive){
      const forwardX = -Math.sin(this.forwardRot); // because we are facing down and NOT to the we right we will use SIN instead of COS
      const forwardY = Math.cos(this.forwardRot);
  
      this.x += this.moveSpeed * forwardX * deltaTime / 1000;
      this.y += this.moveSpeed * forwardY * deltaTime / 1000;
      //console.log(forwardY);
      // deactivate bullet when death timer is up
      this.deathTimer -= deltaTime;
      if(this.deathTimer <= 0) {
        this.deactivate();
      }
    }
  }

  draw(graphics) {
    if(this.isActive){
      // graphics.fillStyle(0xff0000, 1.0);
      graphics.save();
      graphics.translate(this.x, this.y);
      graphics.rotate(this.forwardRot);
     // graphics.fillCircle(0,0, this.radius);
      graphics.lineStyle(3, 0xff0000, 1.0)
      graphics.strokePoints(this.cannonGeo);
      graphics.restore();
    }
  }
}

module.exports = Bullet;
