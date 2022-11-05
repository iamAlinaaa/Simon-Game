var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;


function playSound(buttonColor) {
    // sound for the each button
    switch (buttonColor) {
        case "red":
            new Audio("sounds/red.mp3").play();
            break;
        case "blue":
            new Audio("sounds/blue.mp3").play();
            break;
        case "green":
            new Audio("sounds/green.mp3").play();
            break;
        case "yellow":
            new Audio("sounds/yellow.mp3").play();
            break;
        default: console.log(randomChosenColour);
            break;
    }
}

    // May be fone like this 
//     function playSound(name) {
//     var audio = new Audio("sounds/" + name + ".mp3");
//     audio.play();
//   }


function animatePress(currentColour) {
    //  id of button == name of button, animate the button
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function checkAnswer(currentLevel) {
    // checking if the answer that user gave right or wrong

    //  if User Succeed
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        };

        //  If User Wrong
    } else if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {
            new Audio("sounds/wrong.mp3").play();
            $("body").addClass("game-over");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();
    }
}

// Ends previous game when user is wrong and asks to start a new one.
function startOver() {
    level = 0;
    gamePattern = [];
    $("#level-title").html("Game Over. Press 'A' Key to restart");
}


function nextSequence() {
    // make userClickedPattern Array empty at each level.
    userClickedPattern = [];

    // update the level +1 each time the function called.
    level++;
    $("#level-title").text(`Level ${level}`);

    // find random number for choosing button at next level.
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    // add button color to game patterns + button animation and sound.
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

// First time of playing the game. Document listens for events and user's key press.
$(document).on("keydown", function (event) {
    if (level === 0 && event.key === "a") {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
    };
})

/* For Checking user buttin clicks.
Use .btn class to capture only buttons clicks, 
not the clicks on the screen. */
$(".btn").on("click", function (event) {
    var userChosenColour = event.target.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);

    /* checking the answer. latest user's key pressed(find with index)  */
    checkAnswer(userClickedPattern.length - 1);
});
