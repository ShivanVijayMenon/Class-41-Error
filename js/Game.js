class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100, 200);
    car1.addImage("car1", car1Image);

    car2 = createSprite(300, 200);
    car2.addImage("car2", car2Image);

    car3 = createSprite(500, 200);
    car3.addImage("car3", car3Image);

    car4 = createSprite(700, 200);
    car4.addImage("car4", car4Image);

    cars = [car1, car2, car3, car4];

  }

  play(){
    form.hide();

    player.getCarsAtEnd();

    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      
      background(groundImage);
      image(trackImage, 0, -displayHeight*3.55, displayWidth-20, displayHeight*5);

      var index = 0;
      var x = 200;
      var y;

      for(var plr in allPlayers){
        
        index = index +1;
        x = x+ 220;
        y = displayHeight - allPlayers[plr].distance + 300;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if(index === player.index){

          cars[index-1].shapeColor = "red";
          fill("red");
          ellipse(x, y, 60, 60);
          camera.position.x = displayWidth/2
          camera.position.y = cars[index-1].y; 
        }
        

      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }

    if(player.distance > 3850){

      gameState = 2;
      player.rank += 1;
      Player.updateCarsAtEnd(player.rank);

    }

    drawSprites();

  }

  end(){

    console.log("Game Over");
    console.log(player.rank);
  }

}

