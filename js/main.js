// JavaScript source code
var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 1200,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload() {
    this.load.image('background', './images/background.png');
    this.load.image('p1', './images/p1.png');

}

function create() {
    this.add.image(800, 1200, 'background');

 
}

function update() {

}