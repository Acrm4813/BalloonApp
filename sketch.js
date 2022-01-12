var balloon,balloonImage1,balloonImage2;
var database, position, ballposition;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  balloonposition = database.ref('balloon/heoght');
  balloonposition.on("value", readHeight, showError);

  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(-1,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(1,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,-1);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeight(0,+1);
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}
function updateHeight(x,y){
  database.ref('balloon/heoght').set({
      'x':heoght.x+x,
      'y':heoght.y+y
  });
}

function readHeight(data){
  heoght = data.val();
  balloon.x = heoght.x;
  balloon.y = heoght.y;
}

function showError(){
  console.log("Error");
}