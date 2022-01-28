var game_start = false;
var color_pattern = [];
var level = 0;
var user_click_counter = 0;

//---------------------------------------- Start Game Section ----------------------------------------
document.addEventListener('keypress', startGame)

function startGame(){
    //Start Game, Increase Level, and Unbind Keypress Event
    game_start = true;
    increaseLevel();
    document.removeEventListener('keypress', startGame)
}
//----------------------------------------------------------------------------------------------------

//---------------------------------------- Lose Game Section ----------------------------------------
function loseGame(){
    //Change Heading
    document.getElementById("title").innerText="Game Over, Press Any Key to Restart";
    
    //Change Screen Color
    document.querySelector("body").style.backgroundColor="red";
    

    setTimeout(function () {
        document.querySelector("body").style.backgroundColor="#68074f";
    }, 100)
    
    //Play Audio
    var audio = new Audio("assets/sounds/wrong.mp3");
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
    document.addEventListener("keypress", startGame)
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
    var audio_src = "assets/sounds/" + color + ".mp3";
    var audio = new Audio(audio_src);
    audio.play();
}
//--------------------------------------------------------------------------------------------------------

//---------------------------------------- Level Up Section ---------------------------------------- 
function fadeOut(object) {
    //Change Opacity of Object to 0.2 Inside SetInterval Function
    var fadeOutEffect = setInterval(function () {
        if (object.style.opacity > 0.2) {
            object.style.opacity -= 0.1;
        } else {
            clearInterval(fadeOutEffect);
        }
    }, 10);
}

function fadeIn(object) {
    //Change Opacity of Object to 1 Inside SetInterval Function
    var opacity = 0.2;
    var fadeInEffect = setInterval(function () {
        if (opacity >= 1){
            clearInterval(fadeInEffect);
        }
        object.style.opacity = opacity;
        object.style.filter = 'alpha(opacity=' + opacity * 100 + ")";
        opacity += opacity * 0.1;
    }, 10);
}

function increaseLevel() {
    //Update Values and Generate New Color
    user_click_counter = 0;
    level += 1;
    var generated_color = getNewColor();
    color_pattern.push(generated_color);

    //Play Sound of Generated Color and Fade it in and out
    playColorSound(generated_color);
    var button=document.getElementById(generated_color);
    fadeOut(button,10);
    fadeIn(button,10);

    //Update Title
    document.getElementById("title").innerText="Level " + level;
}
//--------------------------------------------------------------------------------------------------

//---------------------------------------- User Play Section ---------------------------------------- 

var buttons=document.getElementsByClassName("btn");
for ( var i=0; i<buttons.length;i++){
    buttons[i].addEventListener("click", submit)
}
function submit() {
    //Check game_start on any color button click
    if (game_start){
        //Increase click counter, which is used as index of color_pattern array
        user_click_counter += 1;
        var pressed_color = this.id;

        //Change css color on click using class
        document.getElementById(pressed_color).classList.add("pressed");
        
        setTimeout(function () {
            document.getElementById(pressed_color).classList.remove("pressed");
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
}
//---------------------------------------------------------------------------------------------------