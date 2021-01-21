var dog,sadDog,happyDog;
var button1
var button2
var database


function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  milk=loadImage("Milk.png")
}

function setup() {
  createCanvas(1000,400);
  database=firebase.database();
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feeddog)


  addFood=createButton("add food")
  addFood.position(800,95)
  addFood.mousePressed(addFood)


}

function draw() {
  background(46,139,87);
  fill (225,225,254)
  textSize(15)
  if(lastfed>=12){
    text("last feed : "+lastfed%12 +"PM",350,30)
  }else if(lastfed==0){
    text("last feed : 12 AM",350,30)
  }else{
    text("last feed :"+ lastfed + "AM",350,30)
  }
  drawSprites();
}

//function to read food Stock
fedtime=database.ref("feedtime")
fedtime.on("value",(data)=>{
  lastfed=data.val();
})


//function to update food stock and last fed time
function feeddog(){
  dog.addImage(happyDog)

  foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    feedtime:hour()
  })
}


//function to add food in stock
function addFoods(){
  foodS++
  database.ref("/").update({
    food:foodS
  })
}
