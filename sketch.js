var canvas, backgroundImage;

var gameState = 0;
var playerCount;
var allPlayers;
var distance = 0;
var database;

var cars;
var car1, car2, car3, car4;

var form, player, game;
var car1Image, car2Image, car3Image, car4Image, groundImage, trackImage;

function preload(){

  car1Image = loadImage("image/car1.png");
  car2Image = loadImage("image/car2.png");
  car3Image = loadImage("image/car3.png");
  car4Image = loadImage("image/car4.png");
  groundImage = loadImage("image/ground.png");
  trackImage = loadImage("image/track.jpg");

}

function setup(){
  canvas = createCanvas(displayWidth-45,displayHeight-145);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }

  if(gameState === 2){

    game.end();

  }

}
