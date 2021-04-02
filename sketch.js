  
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var girl,girlImg;
var ground, invisibleGround;
var sweetsGroup, sweets2Group, sweets3Group, sweet1, sweet2, sweet3;
var vegetableGroup, vegetable;
var score;


function preload(){
  groundImg = loadImage("Candyland.jpg")

  girlImg = loadImage("Girl.png");
  
  sweet1Img = loadImage("Sweet(1).png");
  sweet2Img = loadImage("Sweet(2).png");
  sweet3Img = loadImage("Sweet(3).png");

  vegetableImg = loadImage("Broccoli.png");
}

function setup() {
  createCanvas(750,640);

  ground = createSprite(100,300,600,10);
  ground.addImage("ground",groundImg);
  ground.x = ground.width/2;
  ground.velocityX = -4; 
  
  girl = createSprite(150,displayHeight-350,20,50);
  girl.addImage("girl", girlImg);
  girl.scale = 0.5;

  invisibleGround = createSprite(200,displayHeight-220,1225,10);
  invisibleGround.velocityX = -4;
  invisibleGround.x=invisibleGround.width/2;
  invisibleGround.visible = false;
  
  sweetsGroup = createGroup();
  sweets2Group = createGroup();
  sweets3Group = createGroup();

  vegetableGroup = createGroup();
  
  girl.setCollider("rectangle",10, 120, 400, 100, 00);
  girl.debug = false;
  
  score = 0;
  
}

function draw() {
  
  background(220);

  if (gameState === PLAY){
    if (invisibleGround.x<0){
      invisibleGround.x=invisibleGround.width/2;
    }
  
    if (ground.x<300){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& girl.y >= 159) {
      girl.velocityY = -12;
  }
  
  girl.velocityY = girl.velocityY + 0.8;

  spawnSweets();
    spawnSweets2();
    spawnSweets3();
    spawnVegetable();

    if(sweetsGroup.isTouching(girl)){
      sweetsGroup.destroyEach();
      score++;
    }
  
    if(sweets2Group.isTouching(girl)){
      sweets2Group.destroyEach();
      score++;
    }
  
    if(sweets3Group.isTouching(girl)){
      sweets3Group.destroyEach();
      score++;
    }
  
    switch(score){
      case 4: girl.scale=0.2;
        break;
      case 8: girl.scale=0.3;
        break;
      case 12: girl.scale=0.4;
        break;
      case 16: girl.scale=0.5;
        break;
        default: break;
    }
    drawSprites();
  }
  else if (gameState===END){
    if(vegetableGroup.isTouching(girl)){
      girl.scale=0.1;
      vegetableGroup.destroyEach();
      score=score-2;
    }
  }

girl.collide(invisibleGround);

  fill("darkgreen");
  textSize(30);
  text("Avoid the vegetables🥦",30,120);

  fill("hotpink");
  textSize(30);
  text("Candy collected!🍭: "+ score, 30,80);
}

function spawnSweets(){
  if(World.frameCount%100 === 0){
    sweet1 = createSprite(600,500,20,20);
    sweet1.scale = 0.4;
    sweet1.addImage("sweet",sweet1Img);
    sweet1.x = Math.round(random(900,1100));
    sweet1.y = Math.round(random(400,500));
    sweet1.velocityX = -5;
    sweet1.setLifetime = 400;
    
    sweetsGroup.add(sweet1);
  }
}
function spawnSweets2(){
  if(World.frameCount%220 === 0){
    sweet2 = createSprite(600,500,20,20);
    sweet2.scale = 0.4;
    sweet2.addImage("sweet",sweet2Img);
    sweet2.x = Math.round(random(900,1100));
    sweet2.y = Math.round(random(200,500));
    sweet2.velocityX = -5;
    sweet2.setLifetime = 400;
    
    sweets2Group.add(sweet2);
  }
}
function spawnSweets3(){
  if(World.frameCount%300 === 0){
    sweet3 = createSprite(600,500,20,20);
    sweet3.scale = 0.4;
    sweet3.addImage("sweet",sweet3Img);
    sweet3.x = Math.round(random(900,1100));
    sweet3.y = Math.round(random(200,500));
    sweet3.velocityX = -5;
    sweet3.setLifetime = 400;
    
    sweets3Group.add(sweet3);
  }
}
function spawnVegetable(){
  if(World.frameCount%200 === 0){
    vegetable = createSprite(600,500,20,20);
    vegetable.scale = 0.1;
    vegetable.addImage("broccoli",vegetableImg);
    vegetable.y = Math.round(random(400,500));
    vegetable.x = Math.round(random(900,1100));

    vegetable.velocityX = -5;
    vegetable.setLifetime = 400;

    vegetableGroup.add(vegetable);
  }
}
function reset(){
  gameState = PLAY;
  
  sweetsGroup.destroyEach();
  sweets2Group.destroyEach();
  sweets3Group.destroyEach();
  vegetableGroup.destroyEach();
  
  score = 0;
  
}


