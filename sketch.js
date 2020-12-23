var dog, dogImage, happyDog, database, foodS, foodStock;
var foodCount = 20

function preload()
{
  happyDog = loadImage("images/dogImg1.png");
  dogImage = loadImage("images/dogImg.png")
}

function setup() {
  createCanvas(500, 500);
  
  dog = createSprite(250, 250, 30, 30);
  dog.addImage(dogImage);
  dog.scale = 0.2

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);
    foodCount = foodCount - 1
  }

    drawSprites();

    textSize(16)
    fill("white")
    stroke("black")
    text("Note: Press the UP Arrow Key to Feed Milk To Drago", 65, 30);
    
    textSize(29)
    text("Food: " + foodS, 190, 160)
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  
  if(x <= 0){
    x = 0;
  } else{
    x = x + 1
  }
  
  database.ref('/').update({
    Food: x
  })
}


