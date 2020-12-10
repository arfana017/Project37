//Create variables here
var dog, happyDog, sadDog, garden, washroom, database;
var database, foodS, foodStock, canvas;
var lastFed, fedTime, foodObj, feed, addFood, food1;
var foodCount, input, milk, milkImg;
var gameState,readState;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
  milkImage = loadImage("images/Milk.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  bedroom = loadImage("images/Bed Room.png");

}

function setup() {

  database = firebase.database();
  
  food1 = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

  dog = createSprite(650,250,30,30);
  dog.addImage(dogImage);
  dog.scale = 0.2;

  milk = createSprite(565,300,10,10);
  milk.addImage(milkImage);
  milk.scale = 0.1;
  milk.visible = true;
  
  addFood = createButton("Add food");
  addFood.position(370, 70);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed Dog");
  feed.position(450, 70);
  feed.mousePressed(feedDog);

  readState = database.ref('gameState');
  readState.on("value",function(data) {
    gameState = data.val();

  })

  createCanvas(800, 400);

}


function draw() {  

  background("green");

  currentTime = hour();
  
  if(currentTime == (lastFed + 1)) {
      update("Playing");
      food1.garden();
   }
   
   else if(currentTime == (lastFed + 2)) {
    update("Sleeping");
      food1.bedroom();
   }
   
   else if(currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)){
    update("Bathing");
      food1.washroom();
   }
   
   else {
    update("Hungry");
    food1.display();
   }

  if(gameState != "Hungry") {

    feed.hide();
    addFood.hide();
    dog.remove();

  }

  else {

    feed.show();
    addFood.show();
    
   }


  drawSprites();

  }

  function feedDog() {
    food1.getFoodStock();
    food1.updateFedTime();
  
    if(foodCount === 0) {
      foodCount = 0;
      milk.visible = false;
      dog.addImage(dogImage);
    } 
    
    else {

      dog.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour(),
    gameState:"Hungry"
  })

    }
  }
  
  function readStock(data){
    foodS=data.val();
    food1.updateFoodStock(foodS);
  }

  function addFoods() {

    foodS++;
    database.ref('/').update({
      Food:foodS
    })

  }

  function update(state) {

    database.ref('/').update({
      gameState:state
    })

  }
  

