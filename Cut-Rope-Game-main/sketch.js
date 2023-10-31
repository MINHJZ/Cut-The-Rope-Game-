const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var fruit_con2;
var fruit_con3;
var rope3;
var star_display;

var star = 0;

var oneStar,twoStar,emptyStar,starImg,star1,star2;
var muteImg;


var bg_img;
var food;
var gameWin;

var button,blower, ballon,button3;
var button2;
var monkey;
var img_momk
var mute_btn;
var unMute;
var knife;
var knifeO;

var monkeyCatch;
var ctch, air_sound;
var sadImg;
var monkey_sad;
var level_btn;

var knife2;
var mute_btn;

var fr,rope2;

var bg_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
function preload()
{
  bg_img = loadImage('bgimg.png');
  food = loadImage('bananna.png');
  img_momk = loadImage('monkey.png');

  //bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  bg_song = loadSound('bgMusic.mp3');
blade = loadImage('knife2.png');
ctch = loadAnimation("monkeyCatch.png");
knife = loadImage('knife2.png');
ballon = loadImage('balloon.png');
air= loadSound('air.wav');
unMute = loadImage("unmute.png");
sadImg = loadAnimation("monkeysad.png");
starImg = loadImage('star.png');
emptyStar = loadAnimation("empty.png");
oneStar =  loadAnimation("one_star.png");
twoStar = loadAnimation("stars.png");
muteImg = loadAnimation("mute.png");
}

function setup() {
  createCanvas(500,600);


  frameRate(80);

  bg_song.play();
  bg_song.setVolume(0.80);



  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(70,70);
  button.mouseClicked(drop);

  button2 = createImg('cut_btn.png');
  button2.position(320,20);
  button2.size(70,70);
  button2.mouseClicked(drop2);

  button3 = createImg('cut_btn.png');
  button3.position(90,190);
  button3.size(70,70);
  button3.mouseClicked(drop3);

  



 unMute=createImg("unmute.png");
 unMute.position(420,20);
 unMute.size(50,50);
 unMute.mouseClicked(mute);

 

 
blower = createImg("balloon.png")
blower.position(310,89);
blower.size(150,100);
blower.mouseClicked(airBlower);
 


 rope = new Rope(6,{x:245,y:30});
 rope2 = new Rope(6,{x:360,y:30});
rope3 = new Rope(6,{x:100,y:220});



  monkey = createSprite(230,520,100,100);
  monkey.scale = 0.7;
  monkey.addImage(img_momk);

  monkey.addAnimation('monkeyCatch',ctch);
  monkey.addAnimation('monkey_sad',sadImg);



  star_display = createSprite(70,20,30,30);
  star_display.scale = 0.2;



  star_display.addAnimation('empty',emptyStar);
  star_display.addAnimation('one',oneStar);
  star_display.addAnimation('two',twoStar);

  star_display.changeAnimation('empty');


  star1 = createSprite(220,390,20,20);
  star1.addImage(starImg);
  star1.scale = 0.02;

  star2 = createSprite(70,290,20,20);
  star2.addImage(starImg);
  star2.scale = 0.02;



  
  knifeO = createSprite(420,250,50,50);
  knifeO.addImage(knife);
  knifeO.scale=0.3;

  knife2 = createSprite(70,420,50,50);
  knife2.addImage(knife);
  knife2.scale=0.3;

  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit);
  fruit_con3 = new Link(rope3,fruit);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,60);
  }
  pop();

  rope.show();
  rope2.show();
  rope3.show();
  Engine.update(engine);
  //ground.show();

  drawSprites();

  if(collide(fruit,monkey)==true)
  {
    

    fruit=null;
    gameWin();
    eating_sound.play();
    monkey.changeAnimation('monkeyCatch');
  
  }


  if(fruit!=null && fruit.position.y>=550)
  {
  
    gameOver();
    fruit=null;
    sad_sound.play();
    monkey.changeAnimation('monkey_sad');
    bg_song.stop();
  
     
   }

   if(collide(fruit,knifeO)==true)
  {
    monkey.changeAnimation('monkey_sad');
  
    lostB();
    fruit=null;
  bg_song.stop();
  
  }


  if(collide(fruit,star1)==true){

star1.visible = false;
fruit!=null
fruit.visible = false;
star_display.changeAnimation('one');

  }

  if(collide(fruit,star2)==true){

    star2.visible = false;
    fruit!=null
    fruit.visible = false;
    star_display.changeAnimation('one');
    
      }

      if(collide(fruit,knife2)==true)
      {
        monkey.changeAnimation('monkey_sad');
      
        lostB();
        fruit=null;
      bg_song.stop();
      
      }
    

   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function remove_rope()
{
  
  rope.break();
  fruit_con2.dettach();
 fruit_con2 = null; 
}

function drop2()
{
  cut_sound.play();
  rope2.break();
  fruit_con2.detach();
  fruit_con2 = null; 
}


function drop3()
{
  cut_sound.play();
  rope3.break();
  fruit_con3.detach();
  fruit_con3 = null; 
}





function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
             // World.remove(engine.world,fruit);
               //fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}

function mute(){


  if(bg_song.isPlaying()){

    bg_song.stop();

    mute_btn=createImg("mute.png");
 mute_btn.position(420,20);
 mute_btn.size(50,50);


  }else{

   bg_song.play();

  mute_btn=createImg("unmute.png");
 mute_btn.position(420,20);
 mute_btn.size(50,50);

  }

}






function airBlower(){

Matter.Body.applyForce(fruit,{x:0,y:0},{x:-0.02,y:0});
air.play();

}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "REVIVE ME"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}

function gameWin() {
  swal(
    {
      title: `YOU WIN!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "Play again"

    },
  
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    },

    
  );
}


function lostB() {
  swal(
    {
      title: `LOST BANNANA`,
      text: " game over!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/board.png",
      imageSize: "150x150",
      confirmButtonText: "REVIVE ME"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    },
  );
}



































