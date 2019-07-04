var buttonColours= ["red", "blue", "green", "yellow"];
var gamePattern= [];
var userClickedPattern= [];
var level=0;
var started=false;

$(document).keypress(function(){
if(!started){
$("#level-title").text("level "+level);
nextSequence();
started=true;
}
});

$(".btn").click(function(){

var userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});


function nextSequence()
{
userClickedPattern =[];
level++;
$("#level-title").text("level "+level);
var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

 gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

var aud= new Audio("sounds/"+randomChosenColour+".mp3");
aud.play();
playSound(randomChosenColour);
animatePress(randomChosenColour);

}

function playSound(name){

  var aud= new Audio("sounds/"+name+".mp3");
  aud.play();

}

function animatePress(currentColour){

$("#"+currentColour).addClass("pressed");

setTimeout(function(){

$("#"+currentColour).removeClass("pressed");
},100);

}

function checkAnswer(currentLevel){

if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
  console.log("success");

  if(userClickedPattern.length===gamePattern.length)
  {
    setTimeout(nextSequence,1000);
  }
}
else{
  console.log("error");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
$("body").removeClass("game-over");
  },200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
  startOver();
}

}

function startOver(){

level=0;
started=false;
gamePattern=[];

}
