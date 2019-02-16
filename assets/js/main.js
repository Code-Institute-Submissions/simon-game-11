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
    });
    green.on('click', function (){
        play_sound(green, greenSound);
    });
    yellow.on('click', function (){
        play_sound(yellow, yellowSound);
    });
    blue.on('click', function (){
        play_sound(blue, blueSound);
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
    
});