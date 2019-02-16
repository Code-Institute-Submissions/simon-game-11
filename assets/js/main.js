$(document).ready(function(){

// Global variables    
    var red = $('#red');
    var green = $('#green');
    var blue = $('#blue');
    var yellow = $('#yellow');
    var redSound = $('#redSound')[0];
    var greenSound = $('#greenSound')[0];
    var blueSound = $('#blueSound')[0];
    var yellowSound = $('#yellowSound')[0];
    var incorrectSound = $('#incorrectSound')[0];
   
// Function to generate random color sequence for computer
    var colors = ["red", "green", "blue", "yellow"];
    var computerSequence = [];
    function generateRandomColorSequence(sequenceLength) {
       for (var i=0; i<sequenceLength; i++) {
            var randomNumber = Math.floor(Math.random()*4);
           computerSequence.push(colors[randomNumber]);
       }
       return computerSequence;
    }
   
// Handling events
    red.on('click', function (){ 
        play_sound(red, redSound);
        recordAndCheckPlayerSequence(computerSequence, 'red');
    });
    green.on('click', function (){
        play_sound(green, greenSound);
        recordAndCheckPlayerSequence(computerSequence, 'green');
    });
    yellow.on('click', function (){
        play_sound(yellow, yellowSound);
        recordAndCheckPlayerSequence(computerSequence, 'yellow');
    });
    blue.on('click', function (){
        play_sound(blue, blueSound);
        recordAndCheckPlayerSequence(computerSequence, 'blue');
    });

// function to play sound and other effects
    function play_sound(colorId, soundId) {
        soundId.play();
        // shadow effect added
        colorId.addClass("shadow-effect");
        // shadow effect removed
        setTimeout(no_shadow_effect, 100);
        function no_shadow_effect(){
            colorId.removeClass("shadow-effect");
        }
    }

// function to play given sequence
    // works perfectly in Mozilla firefox; no sound in Chrome - throws error: Uncaught (in promise) DOMException
    function computerPlayRandomColorSequence(sequenceLength) {
        generateRandomColorSequence(sequenceLength);
        $.each(computerSequence, function(i) {
            setTimeout(function(){
              $("#" + computerSequence[i]).click();   
            }, i * 1000);
        });
    }

// function to record and check player sequence 
    var playerSequence = [];
    function recordAndCheckPlayerSequence(computerSequence, color) {
        if (playerSequence.length < computerSequence.length){
            playerSequence.push(color);
            console.log(playerSequence);
            check();
        } else {
            incorrectSound.play();
            console.log('Wrong');
        }
    }
    // function to check player sequence 
    function check(){
        for (var i=0; i<playerSequence.length; i++){
            if (playerSequence[i] == computerSequence[i]){
                console.log('Right');
            } else {
                incorrectSound.play();
                console.log('Wrong');
            }
        }
    }
    // function test
    var x = generateRandomColorSequence(10);
    console.log(generateRandomColorSequence(x));
    
});