$(document).ready(function(){

// VARIABLES
    // scores/timer/award 
    var scoresId = $('#scores');
    var countdown = $("#countdown");
    var scores = 0;
    var trophy = $('.fa-trophy');
    var typeOfAward = $('#award-type');
    // coloured buttons
    var red = $('#red');
    var green = $('#green');
    var blue = $('#blue');
    var yellow = $('#yellow');
    // audio files 
    var redSound = $('#redSound')[0];
    var greenSound = $('#greenSound')[0];
    var blueSound = $('#blueSound')[0];
    var yellowSound = $('#yellowSound')[0];
    var incorrectSound = $('#incorrectSound')[0];
    // game status
    var statusDisplay = $('#status');
    var computerPlaying;
    // game options
    var newGame = $("#newGame");
    var exitGame = $('#exit');
    var exitGameButtonClicked;
    var easy = $("#easy");
    var continueGameTimer;
    var mode;
    var yes = $('#yes');
    var no = $('#no');
    var clicked;
    // sequences
    var playerSequence;
    var computerSequence;
    var sequenceLength = 1;

// Function call - START button enabled / EXIT button disabled
    enableStartGameOption();
    disableExitGameOption();
    
// Function - Initiate game
    function playGame() {
        scores = 0;
        scoresId.html(scores);
        awardType();
        continuePlaying();
    }
    
// Function - Continue game
    function continuePlaying() {
        awardType();
        computerSequence = [];
        statusDisplay.html('Computer playing...');
        computerPlayRandomColorSequence(sequenceLength);
        setTimeout(playerTurn, sequenceLength * 1100);
        
        function playerTurn () {    // Function - Prompt player to play
            enableExitGameOption();
            enableStartGameOption();
            playerSequence = [];
            statusDisplay.html('Your turn to play...');
            clicked = false;
            countdownForHardLevel();
            enableColorsClickEvents();
        }
    }    
var eleId = this.id

// Function - Various click events
    // enable click events
    function enableColorsClickEvents() {
        $(".color-btn").on('click', function (){ 
            clicked = true;
            playSound($("#" + this.id), $("#" + this.id + "Sound")[0]);
            recordAndCheckPlayerSequence(this.id);
        });
    }
    function enableStartGameOption() {
        newGame.on("click", playGame);
    }
    function enableExitGameOption() {
        exitGame.on("click", endGame);
    }
    // disable click events
    function disableColorClickEvents() {
        red.off('click');
        yellow.off('click');
        green.off('click');
        blue.off('click');
    }    
    function disableStartGameOption() {
        newGame.off("click");
    }
    function disableExitGameOption() {
        exitGame.off("click");
    }
    // Exit game options YES/NO
    $(document).on("click", "button#yes", yesEndGame); // CREDIT : https://www.tutorialrepublic.com/faq/how-to-bind-click-event-to-dynamically-added-elements-in-jquery.php
    $(document).on("click", "button#no", noEndGame);

// Function - Awarding player 
    function awardType() {
        if (scores >= 10) {
            trophy.css({'color':'#cd7f32', 'display':'block'});
            typeOfAward.html('Bronze');
        } else if (scores >= 25) {
            trophy.css({'color':'silver', 'display':'block'});
            typeOfAward.html('Silver');
        } else if (scores >= 50) {
            trophy.css({'color':'gold', 'display':'block'});
            typeOfAward.html('Gold'); 
        } else if (scores >= 75) {
            trophy.css({'color':'#e5e4e2', 'display':'block'});
            typeOfAward.html('Platinum');
        } else if (scores >= 100) {
            trophy.css({'color':'#b9f2ff;', 'display':'block'});
            typeOfAward.html('Diamond'); 
        } else {
            trophy.css('display', 'none');
        }
    }
    
// Function - Check game mode selected
    function gameMode() {
        if (easy.is(":checked")){
            return mode = 'easy';
        } else {
            return mode = 'hard';
        }
    }
    
// Function - Countdown for hard mode
    function countdownForHardLevel() {
        if (gameMode() == 'hard') {
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
                } else if (clicked == true || exitGameButtonClicked == true) {
                    clearInterval(interval);
                    countdown.html('-');
                }
            }, 1200) // 1.2s used instead of 1s to slightly slow down the timer
        }
    }

// Function - Exit game
    function endGame() {
        statusDisplay.html('<div class="gameOver">Are you sure?</div><br><button type="button" id="yes">yes</button><button type="button" id="no">no</button>');
        exitGameButtonClicked = true;
    }
    function yesEndGame() {
        statusDisplay.html('<div class="gameOver">Game Over </div><br>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
        disableExitGameOption();
        sequenceLength = 1;
        exitGameButtonClicked = false;
    }
    function noEndGame() {
        continuePlaying();
        exitGameButtonClicked = false;
    }

// Function - Play sound and add box shadow effect
    function playSound(colorId, soundId) {
        soundId.play();
        colorId.addClass("shadow-effect");
        setTimeout(noShadowEffect, 100);
        function noShadowEffect(){
            colorId.removeClass("shadow-effect");
        }
    }

// Function - Generate random color sequence
    var colors = ["red", "green", "blue", "yellow"];
    function generateRandomColorSequence(sequenceLength) {
        for (var i=0; i<sequenceLength; i++) {
            var randomNumber = Math.floor(Math.random()*4);
            computerSequence.push(colors[randomNumber]);
        }
        return computerSequence;
    }

// Function - Computer plays random sequence
    function computerPlayRandomColorSequence(sequenceLength) {
        disableColorClickEvents();
        disableExitGameOption();
        disableStartGameOption();
        generateRandomColorSequence(sequenceLength);
        $.each(computerSequence, function(i) {
            computerPlaying = setTimeout(function(){
                var colorId = $("#" + computerSequence[i]);
                var soundId = $("#" + computerSequence[i] + "Sound")[0];
                playSound(colorId, soundId);  
            }, i * 1000);
        });
    }

// Function - Record and call function to check player sequence 
    function recordAndCheckPlayerSequence(color) {
        playerSequence.push(color);
        gameStatus();
    }
    
// Function - Check game status- game over or game continue
    function gameStatus() {
        check();
        if (check() == 'Right') {
            if (playerSequence.length < computerSequence.length) {
                statusDisplay.html('Well done!');
            } else if (playerSequence.length == computerSequence.length){
                statusDisplay.html('Next play! Get ready!');
                continueGameTimer = setTimeout(function(){
                    scores++;
                    scoresId.html(scores);
                    sequenceLength++;
                    continuePlaying();
                    }, 1500);
            } else {
                 return check() == 'Wrong';
            }
        }    
        else {
            if (gameMode() == 'hard') {
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

// Function - Check player sequence 
    function check(){
        var lastPositionInPlayerSequence = playerSequence.length - 1;
        if (playerSequence[lastPositionInPlayerSequence] == computerSequence[lastPositionInPlayerSequence] && playerSequence.length <= computerSequence.length){
            return 'Right';
        } else {
            disableColorClickEvents();
            incorrectSound.play();
            clearTimeout(continueGameTimer);
            return 'Wrong';
        }
    }
});

