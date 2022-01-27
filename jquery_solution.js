game_start = false;
var color_pattern = [];
var level = 0;
var user_click_counter = 0;

// Start Game Section: Start Game by increasing level and binding/unbinding keypress event
// -------------------------------
$(document).keypress(function(){
    startGame()
})

function startGame(){
    game_start = true;
    increaseLevel();
    $(document).unbind("keypress");
}
// -------------------------------

// Lose Game Section
// -------------------------------
function loseGame(){
    //Change Heading and Screen Color, and Play Audio
    $("#title").text("Game Over, Press Any Key to Restart");
    
    $("body").css("background-color", "red");
    setTimeout(function () {
        $("body").css("background-color", "#68074f");
    }, 100)
    
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}
// -------------------------------

//Restart Game Section
// -------------------------------
function restart() {
    //Restart all values and rebind keypress function
    game_start = false;
    color_pattern = [];
    level = 0;
    user_click_counter = 0;
    $(document).bind("keypress", startGame);
}
// -------------------------------
function playColorSound(color) {
    var audio_src = "sounds/" + color + ".mp3";
    var audio = new Audio(audio_src);
    audio.play();
}
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getNewColor() {
    var random_num = getRandomNumber(1, 4);
    var color = "";
    if (random_num == 1) {
        color = "green";
    } else if (random_num == 2) {
        color = "red";
    } else if (random_num == 3) {
        color = "yellow";
    } else {
        color = "blue";
    }
    return color;
}
function increaseLevel() {
    user_click_counter = 0;
    level += 1;
    var generated_color = getNewColor();
    color_pattern.push(generated_color);

    playColorSound(generated_color);
    $("#" + generated_color).fadeTo(50, 0.2);
    $("#" + generated_color).delay(50).fadeTo(50, 1);

    $("#title").text("Level " + level);
}
$(".btn").click(function () {
    if (game_start){
        user_click_counter += 1;
        var pressed_color = $(this).attr("id");
    
        $("#" + pressed_color).addClass("pressed");
        setTimeout(function () {
            $("#" + pressed_color).removeClass("pressed");
        }, 100);
    
        if (pressed_color == color_pattern[user_click_counter - 1]) {
            playColorSound(pressed_color);
            if (user_click_counter == level) {
                setTimeout(function () {
                    increaseLevel();
                }, 500);
            }
        } else {
            loseGame();
            restart();
        }
    }
})