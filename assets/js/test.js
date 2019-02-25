$(document).ready(function(){

// VARIABLES
    // scores/timer/award 
    var scoresId = $('#scores');
    var countdown = $("#countdown");
    var scores = 0;
    var trophy = $('.fa-trophy');
    var typeOfAward = $('#award-type');
    // audio files 
    var incorrectSound = $('#incorrectSound')[0];
    // game status
    var statusDisplay = $('#status');
    var computerPlaying;
    // game options
    var start = $("#start");
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

 
    // Game begins when player clicks START button

    start.on("click", newGame);
    function newGame() {
        scores = 0;
        scoresId.html(scores);
        computerSequence = [];
        continueGame();
    }
    
    // Game continue in case of new game or user repeating correct sequence
    
    function continueGame() {
        awardType();
        statusDisplay.html('Simon playing...');
        
        // Function - Random color generated and added to simon sequence
    
        function generateRandomColorSequence(/*sequenceLength*/) {
            var colors = ["red", "green", "blue", "yellow"];
                var randomNumber = Math.floor(Math.random()*4);
                computerSequence.push(colors[randomNumber]);
            return computerSequence;
        }
        
        // Function - Simon plays sequence
        
        function computerPlayRandomColorSequence() {
            disableColorClickEvents();
            disableExitGameOption();
            disableStartGameOption();
            generateRandomColorSequence();
            console.log(computerSequence);
            $.each(computerSequence, function(i) {
                computerPlaying = setTimeout(function(){
                    var colorId = $("#" + computerSequence[i]);
                    var soundId = $("#" + computerSequence[i] + "Sound")[0];
                    playSound(colorId, soundId);  
                }, i * 1000);
            });
        }
        
        computerPlayRandomColorSequence(); 
        
        // Function - User plays and game status updated with every user input
        
        setTimeout(playerTurn, computerSequence * 1100); 
        function playerTurn () {    
            enableExitGameOption(); 
            playerSequence = [];
            statusDisplay.html('Your turn to play...');
            clicked = false;
            timer();
            $(".color-btn").on('click', function (){ 
                clicked = true;
                playSound($("#" + this.id), $("#" + this.id + "Sound")[0]);
                playerSequence.push(this.id);
                gameStatus();
            });
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
                   /* sequenceLength++;*/
                    continueGame();
                    }, 1500);
            } else {
                 return check() == 'Wrong';
            }
        }    
        else {
            if (gameMode() == 'hard') {
                statusDisplay.html('<div class="gameOver">Game Over </div><br>Oops! That\'s not right!<br>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
                /*sequenceLength = 1;*/
                scores = 0;
                scoresId.html(scores);
            } else {
                statusDisplay.html("<div class='gameOver'>Oops! Not quite right!<br><br> Let's have another try! </div>");
                setTimeout(continueGame, 4000);
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
    
    // Function - Awarding player 
    function awardType() {
        switch (true) {
            case (scores < 10):
                trophy.addClass('transparent');
                break;
            case (scores < 25): 
                trophy.addClass('bronze');
                typeOfAward.html('Bronze');
                break;
            case (scores < 50):
                trophy.addClass('silver');
                typeOfAward.html('Silver');
                break;
            case (scores < 75):
                trophy.addClass('gold');
                typeOfAward.html('Gold'); 
                break;
            case (scores < 100):
                trophy.addClass('platinum');
                typeOfAward.html('Platinum');
                break;
            case (scores >= 100):
                trophy.addClass('diamond');
                typeOfAward.html('Diamond'); 
                break;
        }
    }
    }    
    
    



    
    
    function enableExitGameOption() {
        exitGame.on("click", endGame);
    }
    // disable click events
    function disableColorClickEvents() {
       $(".color-btn").off('click');
    }    
    function disableStartGameOption() {
        start.off("click");
    }
    function disableExitGameOption() {
        exitGame.off("click");
    }
    // Exit game options YES/NO
    $(document).on("click", "button#yes", yesEndGame); // CREDIT : https://www.tutorialrepublic.com/faq/how-to-bind-click-event-to-dynamically-added-elements-in-jquery.php
    $(document).on("click", "button#no", noEndGame);


// Function - Check game mode selected
    function gameMode() {
        if (easy.is(":checked")){
            return mode = 'easy';
        } else {
            return mode = 'hard';
        }
    }
    
// Function - Countdown for hard mode
    function timer() {
        var counter = 10;
        var interval = setInterval(function() {
            counter--;
            countdown.html(counter);
            if (counter == 0 && clicked == false) {
                incorrectSound.play();
                disableColorClickEvents();
                clearInterval(interval);
                statusDisplay.html('<div class="gameOver">Time Up! </div>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
                scores = 0;
                scoresId.html(scores);
            } else if (clicked == true || exitGameButtonClicked == true) {
                clearInterval(interval);
                countdown.html('-');
            }
        }, 1200) // 1.2s used instead of 1s to slightly slow down the timer
    }

// Function - Exit game
    function endGame() {
        statusDisplay.html('<div class="gameOver">Are you sure?</div><br><button type="button" id="yes">yes</button><button type="button" id="no">no</button>');
        exitGameButtonClicked = true;
    }
    function yesEndGame() {
        statusDisplay.html('<div class="gameOver">Game Over </div><br>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
        disableExitGameOption();
        exitGameButtonClicked = false;
    }
    function noEndGame() {
        continueGame();
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




    
});

