let buttonColours = ["red", "blue", "green", "yellow"];
//let audio = new Audio('sounds/red.mp3');
let gamePattern = [];
let userClickedPattern = [];
let audio = new Audio();
let gamestarted = false;
let level = 0;



// audio.src = `sounds/${randomChosenColour}.mp3`

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    playSound(buttonColours[randomNumber]);
    $(`#${randomChosenColour}`).fadeOut(50).fadeIn(50).fadeOut(50).fadeIn(50);
    level++;
    $('h1').text(`Level ${level}`);
}

function playSound(name) {
    audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

$(document).keydown(function () {
    if (!gamestarted) {
        nextSequence();
        gamestarted = true;
    }
})

$('.btn').click(function (event) {
    let nameButtonClicked = event.target.id;
    userClickedPattern.push(nameButtonClicked);
    animatedPress(nameButtonClicked);
    playSound(nameButtonClicked);
    checkAnswer();
})

function animatedPress(currentColor) {
    $(`#${currentColor}`).addClass("pressed");
    setTimeout(function () {
        $(`#${currentColor}`).removeClass("pressed");
    }, 100);
}

function checkAnswer() {

    if (userClickedPattern[userClickedPattern.length - 1] != gamePattern[userClickedPattern.length - 1]) {
        userClickedPattern = [];
        gamePattern = [];
        level = 0;
        gamestarted = false;
        $('h1').text("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $('body').addClass('game-over');
        setTimeout(function () {
            $('body').removeClass('game-over');
        }, 200);

    }
    else if (userClickedPattern.length == gamePattern.length) {
        userClickedPattern = [];
        setTimeout(
            function () {
                nextSequence();
            }, 1000)
    }
}