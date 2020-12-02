//Create variables here
var happydog,dogimage,dog,database, foodS,foodstock;
var no_of_bottles;

var feeddog, addfood;
var fedTime, lastFed, foodobj
var washroom, bedroom, graden;

var gameState= "hungry";
var readState;
function preload()
{
  //load images here
  happyDog= loadImage("happydog.png");
  dogimage= loadImage("Dog.png");
  washroom= loadImage("Wash Room.png");
  bedroom= loadImage("Bed Room.png");
  garden= loadImage("Garden.png")

}

function setup() {
	createCanvas(1000, 400);
  dog= createSprite(800,200,150,150);
  
  dog.addImage(dogimage);
  dog.scale=0.15;

  database=firebase.database();
 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  foodobj = new Food();
  
  
  feed= createButton ("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feeddog);

  addFood= createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods)

  readState= database.ref('gameState');
  readState.on("value",function(data){
    gameState= data.val();
  })


}
function readPosition(data){
  no_of_bottles= data.val();
  console.log(no_of_bottles)
  
}

function draw() {  
  
  background("white")
 
 
  fedTime = database.ref ('FeedTime');
  fedTime.on ("value", function(data){
    lastFed= data.val ();
  })

  currentTime= hour ();
  if (currentTime===(lastFed+1)){
    update("Playing");
    foodobj.Garden();
  }

  else if (currentTime==lastFed+2){
    update("sleeping");
    foodobj.Bedroom();
  }

  else if (currentTime>(lastFed+2) && currentTime<=(lastFed+4)){
    update("Bathing");
    foodobj.Washroom();
  }

  else {
    update("hungry");
    foodobj.display();
  }
  if (gameState!="hungry"){
    feed.hide();
    addFood.hide();
    dog.remove ();
      }
      else{
        feed.show();
        addFood.show();
    
      }
  drawSprites();
  
  
  

}

function readStock(data){
  foodS=data.val();
  foodobj.updateFoodStock(foodS);
}

function addFoods ()

{
  foodS++;
  database.ref('/').update({
    Food :foodS
  })
}

function feeddog(){
  dog.addImage(happyDog);
  foodobj.updateFoodStock(foodobj.getFoodStock()-1);
  database.ref ('/').update ({
    Food :foodobj.getFoodStock (),
    FeedTime :hour ()
  })

}


function update(state){
  database.ref('/').update({
    gameState:state
  })
}