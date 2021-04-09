var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed = "12 am"
var lastFedAm = "9 am"
var lastFedPm = "1 pm"



function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1500,600);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.size(200,80);
  addFood.mousePressed(addFoods);

  feed=createButton("feed Dog");
  feed.position(1100,105);
  feed.size(200,80);
  feed.mousePressed(addFoods);

  if(feed.mousePressed(deduct)){
    foodObj.deductFood();
  }
}

function draw() {
  background(46,139,87);
  foodObj.display();

 if(foodObj === 0) {
   dog.addImage(sadDog);
 }

 if(feed.mousePressed(deduct)) {
 if(lastFed>=12) {
  lastFedsPms();
 }
 else if(lastFed === 0) {
  lastFeds();
 }
 else {
  lastFedAms();
 } 
}

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function deduct() {
  foodS--;
  database.ref('/').update({
    Food:foodS
  });
  dog.addImage(happyDog);
}

function lastFeds() {
    textSize(30);
    fill(255);
    text("Last fed: "+lastFed, 300,85);
  }

  function lastFedAms() {
    textSize(30);
    fill(255);
    text("Last fed: "+lastFedAm, 300,85);
  }

  function lastFedPms() {
    textSize(30);
    fill(255);
    text("Last fed: "+lastFedPm, 300,85);
  }
  

