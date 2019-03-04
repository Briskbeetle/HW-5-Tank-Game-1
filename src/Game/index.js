// Import outside libraries
const Phaser = require('phaser');
const StartScreen = require('./Scenes/Startscreen');
const MainScene = require('./Scenes/MainScene');

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [StartScreen, MainScene]
};


// fire bullet 


// Global Phaser Vars
let game;



  // Always clear at the top of update
 


/* We are changin the scene from a single object to an array of multiple scene objects
There is no need for this anymore
phaserConfig.scene = {
  create: create,
  update: update
} */
  
// Exported Module so game can be initialized elseware
const GameManager = {
  init: () => {
    game = new Phaser.Game(phaserConfig);
  },
};

module.exports = GameManager;
