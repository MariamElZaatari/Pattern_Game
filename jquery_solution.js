game_start = false;
var color_pattern = [];
var generated_color = "";
var pressed_color = "";
var level = 0;
var user_click_counter = 0;

$(document).keypress(function (event) {
    game_start = true;
    increaseLevel();
    $(document).unbind("keypress");
})

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
    user_click_counter=0;
    level += 1;
    generated_color = getNewColor();
    color_pattern.push(generated_color);

    playColorSound(generated_color);
    $("#" + generated_color).fadeTo(50, 0.2);
    $("#" + generated_color).delay(50).fadeTo(50, 1);

    $("#title").text("Level "+level);
    console.log(color_pattern);
    console.log(level);
}
$(".btn").click(function () {
    user_click_counter += 1;
    pressed_color = $(this).attr("id");

    $("#" + pressed_color).addClass("pressed");
    setTimeout(function () {
        $("#" + pressed_color).removeClass("pressed");
    }, 100);
    playColorSound(pressed_color);

    if (pressed_color == color_pattern[user_click_counter - 1]) {
        if (user_click_counter == level) {
            setTimeout(function(){
                increaseLevel();
            },1000);
        }
    } else {
        $("#title").text("Game Over, Press Any Key to Restart");
        console.log("lose")
    }
})


