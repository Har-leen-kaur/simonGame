//button Colours and random chosen colour
var buttonColours = ["red", "blue", "green", "yellow"];

//empty array of game pattern
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//User clicking a button
$(".btn").click(function () {
  //button pressed by user gets added to the userClickedPattern
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("failed");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 2000);

    $("h1").html("Game Over!! Press any key to continue");

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  $("h1").html("Level " + level);
  level++;

  //generates random number from 1-3
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  // pushes a random colour into game pattern.
  gamePattern.push(randomChosenColour);

  //flash the button
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);

  console.log("gamePattern in Next sequence = " + gamePattern);
  console.log("userPattern in Next sequence = " + userClickedPattern);
}

function playSound(name) {
  //give sound to the selected button
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//animating the button on user clicks
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//game starts on detecting a key.
$(document).on("keypress", function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
