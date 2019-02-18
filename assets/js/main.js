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
    var newGame = $("#newGame");
    var statusDisplay = $('#status');
    var scoresId = $('#scores');
    var off = $("#off");
    var easy = $("#easy");
    var countdown = $("#countdown");
    var scores = 0;
    var playerSequence;
    var computerSequence;
    var sequenceLength = 1;
    var continueGameTimer;
    var strictMode;
    var difficultyLevel;
    var clicked;
    
// functions to check game options selected by player
    function strictModeOption() {
        if (off.is(":checked")){
            return strictMode = 'off';
        } else {
            return strictMode = 'on';
        }
    }
    function difficultyLevelOption() {
        if (easy.is(":selected")){
            return difficultyLevel = 'easy';
        } else {
            return difficultyLevel = 'hard';
        }
    }

// Countdown for Hard level
    function countdownForHardLevel() {
        if (difficultyLevel == 'hard') {
            var counter = 10;
            var interval = setInterval(function() {
                counter--;
                countdown.html(counter);
                if (counter == 0 && clicked == false) {
                    incorrectSound.play();
                    disableColorClickEvents();
                    clearInterval(interval);
                    statusDisplay.html('<div class="gameOver">Time Up! </div>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
                    sequenceLength = 1;
                    scores = 0;
                    scoresId.html(scores);
                } else if (clicked == true) {
                    console.log('I detected clicked is true');
                    clearInterval(interval);
                    countdown.html('-');
                }
            }, 1200) // 1.2s used instead of 1s to slightly slow down the timer
        }
    }

// Handling events
    function enableColorsClickEvents() {
        red.on('click', function (){ 
            clicked = true;
            console.log(clicked);
            playSound(red, redSound);
            recordAndCheckPlayerSequence('red');
        });
        green.on('click', function (){
            clicked = true;
            console.log(clicked);
            playSound(green, greenSound);
            recordAndCheckPlayerSequence('green');
        });
        yellow.on('click', function (){
            clicked = true;
            console.log(clicked);
            playSound(yellow, yellowSound);
            recordAndCheckPlayerSequence('yellow');
        });
        blue.on('click', function (){
            clicked = true;
            console.log(clicked);
            playSound(blue, blueSound);
            recordAndCheckPlayerSequence('blue');
        });
    }
 
    function disableColorClickEvents() {
        red.off('click');
        yellow.off('click');
        green.off('click');
        blue.off('click');
    }
    
    newGame.on("click", playGame);


// function to play sound and other effects
    function playSound(colorId, soundId) {
        soundId.play();
        // shadow effect added
        colorId.addClass("shadow-effect");
        // shadow effect removed
        setTimeout(noShadowEffect, 100);
        function noShadowEffect(){
            colorId.removeClass("shadow-effect");
        }
    }

// Function to generate random color sequence for computer
    var colors = ["red", "green", "blue", "yellow"];
    function generateRandomColorSequence(sequenceLength) {
       for (var i=0; i<sequenceLength; i++) {
            var randomNumber = Math.floor(Math.random()*4);
           computerSequence.push(colors[randomNumber]);
       }
       return computerSequence;
    }

// function to play given sequence
    // works perfectly in Mozilla firefox; no sound in Chrome - throws error: Uncaught (in promise) DOMException
    function computerPlayRandomColorSequence(sequenceLength) {
        disableColorClickEvents();
        generateRandomColorSequence(sequenceLength);
        $.each(computerSequence, function(i) {
            setTimeout(function(){
                var colorId = $("#" + computerSequence[i]);
                var soundId = $("#" + computerSequence[i] + "Sound")[0];
              playSound(colorId, soundId);   
            }, i * 1000);
        });
    }

// function to record and check player sequence 
    function recordAndCheckPlayerSequence(color) {
        playerSequence.push(color);
        gameStatus();
    }

    // function to check player sequence 
    function check(){
        var lastPositionInPlayerSequence = playerSequence.length - 1;
        if (playerSequence[lastPositionInPlayerSequence] == computerSequence[lastPositionInPlayerSequence] && playerSequence.length <= computerSequence.length){
            return 'Right';
        } else {
            disableColorClickEvents();
            console.log('I was here' + playerSequence)
            incorrectSound.play();
            clearTimeout(continueGameTimer);
            return 'Wrong';
        }
    }
    
// function to check game status- game over or game continue
    function gameStatus() {
        check();
        if (check() == 'Right') {
            if (playerSequence.length < computerSequence.length) {
                statusDisplay.html('Well done!');
            } else if (playerSequence.length == computerSequence.length){
                console.log('I was here also' + playerSequence)
                statusDisplay.html('Next play! Get ready!');
                continueGameTimer = setTimeout(function(){
                    scores++;
                    scoresId.html(scores);
                    sequenceLength++;
                    continuePlaying();
                    }, 1500);
            } else {
                console.log(playerSequence.length + " " +computerSequence.length);
                 return check() == 'Wrong';
            }
        }    
        else {
            if (strictMode == 'on') {
                statusDisplay.html('<div class="gameOver">Game Over </div><br>Oops! That\'s not right!<br>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
                sequenceLength = 1;
                scores = 0;
                scoresId.html(scores);
            } else {
                statusDisplay.html("<div class='gameOver'>Oops! Not quite right!<br><br> Let's have another try! </div>");
                setTimeout(continuePlaying, 4000);
            }
            
        }
    }

// function to initiate simple simon game
    
    function playGame() {
        console.log(difficultyLevelOption());
        console.log(strictModeOption());
        continuePlaying();
    }
    
    // function to continue the game

    function continuePlaying() {
            computerSequence = [];
            statusDisplay.html('Computer playing...');
            computerPlayRandomColorSequence(sequenceLength);
            console.log(computerSequence); // testing in console
            
            setTimeout(playerTurn, sequenceLength * 1100);
            
            function playerTurn () {
                playerSequence = [];
                statusDisplay.html('Your turn to play...');
                enableColorsClickEvents();
                clicked = false;
                countdownForHardLevel();
            }
        }
            
});

