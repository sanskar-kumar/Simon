var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = 0;
var level = 0;
var score = 0;

$(document).keypress(function() {

    if (started == 0) {
        $("h1").text("Level " + level);
        nextSequence();
        started = 1;
        $("#game-name").text("Keep Going");
    }

});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level " + level);
    level = level + 1;


};



$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});

function startOver() {
    started = 0;
    level = 0;
    gamePattern = [];
    score = 0;
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            score++;
            setTimeout(function() {
                nextSequence();
            }, 1000);

        }

    } else {
        playSound("wrong");
        $(document.body).addClass("game-over");
        setTimeout(function() {
            $(document.body).removeClass("game-over");
        }, 200);
        $("h1").text("Game Over! Press any key to restart");
        $("#game-name").text("Your Score: " + score);
        setTimeout(function() {
            startOver();
        }, 1000);

    }

}