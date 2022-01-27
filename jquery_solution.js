game_start = false;
var color_pattern = [];
var level = 0;
var user_click_counter = 0;

//---------------------------------------- Start Game Section ----------------------------------------
$(document).keypress(function(){
    //Bind Keypress Event and Start Game
    startGame()
})

function startGame(){
    //Start Game, Increase Level, and Unbind Keypress Event
    game_start = true;
    increaseLevel();
    $(document).unbind("keypress");
}
//----------------------------------------------------------------------------------------------------

//---------------------------------------- Lose Game Section ----------------------------------------
function loseGame(){
    //Change Heading
    $("#title").text("Game Over, Press Any Key to Restart");
    
    //Change Screen Color
    $("body").css("background-color", "red");
    setTimeout(function () {
        $("body").css("background-color", "#68074f");
    }, 100)
    
    //Play Audio
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}
//---------------------------------------------------------------------------------------------------

//---------------------------------------- Restart Game Section ---------------------------------------- 
function restart() {
    //Restart All Values and Rebind Keypress Event
    game_start = false;
    color_pattern = [];
    level = 0;
    user_click_counter = 0;
    $(document).bind("keypress", startGame);
}
//------------------------------------------------------------------------------------------------------

//---------------------------------------- Generate Color Section ---------------------------------------- 
function getRandomNumber(min, max) {
    //Generate a Random Number
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getNewColor() {
    //Link Generated Random Number to a Color
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

function playColorSound(color) {
    //Link Each Color to Its Audio and Play It
    var audio_src = "sounds/" + color + ".mp3";
    var audio = new Audio(audio_src);
    audio.play();
}
//--------------------------------------------------------------------------------------------------------

//---------------------------------------- Level Up Section ---------------------------------------- 
function increaseLevel() {
    //Update Values and Generate New Color
    user_click_counter = 0;
    level += 1;
    var generated_color = getNewColor();
    color_pattern.push(generated_color);

    //Play Sound of Generated Color and Fade it in and out with a 0.2 opacity
    playColorSound(generated_color);
    $("#" + generated_color).fadeTo(50, 0.2);
    $("#" + generated_color).delay(50).fadeTo(50, 1);

    //Update Title
    $("#title").text("Level " + level);
}
//--------------------------------------------------------------------------------------------------

//---------------------------------------- User Play Section ---------------------------------------- 
$(".btn").click(function () {
    //Check game_start on any color button click
    if (game_start){
        //Increase click counter, which is used as index of color_pattern array
        user_click_counter += 1;
        var pressed_color = $(this).attr("id");

        //Change css color on click using class
        $("#" + pressed_color).addClass("pressed");
        setTimeout(function () {
            $("#" + pressed_color).removeClass("pressed");
        }, 100);
    
        //Check if pressed color is correct by comparing it to the color_pattern array element
        if (pressed_color == color_pattern[user_click_counter - 1]) {
            playColorSound(pressed_color);
            if (user_click_counter == level) {
                //Increase Level if user reached end of pattern
                setTimeout(function () {
                    increaseLevel();
                }, 500);
            }
        } else {
            //Lose and Restart Game if pressed color does not match color_pattern element
            loseGame();
            restart();
        }
    }
})
//---------------------------------------------------------------------------------------------------