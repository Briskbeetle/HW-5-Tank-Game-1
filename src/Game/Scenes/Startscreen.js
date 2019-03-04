const Phaser = require('phaser');

class StartScreen extends Phaser.Scene {
   constructor() { 
    super('StarScreen'); 
   }
   create(){ // HTML user interface, generate array of bullets
    this.overlay = document.querySelector('#start-screen');
    // Ever time this scene begins
    this.overlay.classList.remove('hidden'); // initialize the title prompt as not hidden
    // removes the hidden class from start-screen
    this.keys = {
        space: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE), 
    } 
   }
   update(totalTime, deltaTime){ // optional use of time, weren't using these
    if(this.keys.space.isDown){
        this.overlay.classList.add('hidden');
        // make it hidden
        this.scene.start('MainScene'); // transition to main scene
    }
   }
   
}

module.exports = StartScreen;