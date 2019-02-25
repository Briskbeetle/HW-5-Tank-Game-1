class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 6;
    this.moveSpeed = 250;
    this.forwardRot = 0; // direction it is facing
    this.isActive = false;// initializing bullts to be asleep
    this.deathTimer = 0; // 
  }

activate(x,y, forwardRot){
    this.x = x;
    this.y = y;
    this.forwardRot = forwardRot;
    this.isActive = true; // arm the bullet
    this.deathTimer = 3000; 

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
      graphics.fillCircle(0,0, this.radius);
      graphics.restore();
    }
  }
}

module.exports = Bullet;
