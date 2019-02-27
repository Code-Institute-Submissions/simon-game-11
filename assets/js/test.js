$(document).ready(function(){

// ------------------------------------------------------------------ Variables

    var scoresId = $('#scores');
    var countdown = $("#countdown");
    var trophy = $('.fa-trophy');
    var typeOfAward = $('#award-type');
    var incorrectSound = $('#incorrectSound')[0];
    var statusDisplay = $('#status');
    var colorsButton = $(".color-btn");
    var start = $("#start");
    var exitGame = $('#exit');
    var hard = $("#hard");
    var yes = $('#yes');
    var no = $('#no');
    var scores, playerSequence, computerSequence, retry, newGame, clicked;
    var continueGameTimer, exitGameButtonClicked, notEndGame;
 
// ------------------------------------------------------------------  Functions
    
// New Game begins when player clicks START button
    
    enableClickEvents();
    function playGame() {
        if (newGame == false && retry != true && notEndGame != true) {
            scores++;
            scoresId.html(scores);
            console.log('I was here 1')
        } else if (newGame == false && (retry == true|| notEndGame == true))  {
            console.log('I was here 2')
            scores;
        } else {
            scores = 0;
            scoresId.html(scores);
            computerSequence = [];
            console.log('I was here 3')
        }
        
        awardType();
        statusDisplay.html('Simon playing...');
        
        // Function - Random color generated and added to simon sequence
        function generateRandomColorSequence() {
            var colors = ["red", "green", "blue", "yellow"];
            var randomNumber = Math.floor(Math.random()*4);
            computerSequence.push(colors[randomNumber]);
            return computerSequence;
        }
        
        // Function - Simon plays sequence
        function computerPlayRandomColorSequence() {
            disableClickEvents()
            if (retry == true || notEndGame == true) {
                computerSequence;
                retry = false;
            } else {
                generateRandomColorSequence();
            }
            console.log(computerSequence);
            $.each(computerSequence, function(i) {
                setTimeout(function(){
                    var colorId = $("#" + computerSequence[i]);
                    var soundId = $("#" + computerSequence[i] + "Sound")[0];
                    playSound(colorId, soundId);  
                }, i * 1000);
            });
        }
        
        computerPlayRandomColorSequence(); 
        
        // Function - User plays and game status updated with every user input
        setTimeout(playerTurn, computerSequence.length * 1100); 
        function playerTurn () {
            enableClickEvents()
            playerSequence = [];
            statusDisplay.html('Your turn to play...');
            
            if (hard.is(":checked")) {
                timer();
            }
            clicked = false;
            colorsButton.on('click', function (){ 
                clicked = true;
                playSound($("#" + this.id), $("#" + this.id + "Sound")[0]);
                playerSequence.push(this.id);
                gameStatus();
            });
        }
    
    // Function - Check game status- game over or game continue
    function gameStatus() {
        var lastPosition = playerSequence.length - 1;
        console.log(playerSequence);
        if (playerSequence[lastPosition] == computerSequence[lastPosition] && playerSequence.length < computerSequence.length) {
            statusDisplay.html('Well done!');
        } else if (playerSequence[lastPosition] == computerSequence[lastPosition] && playerSequence.length == computerSequence.length) {
            statusDisplay.html('Next play! Get ready!');
            continueGameTimer = setTimeout(function(){
                newGame = false;
                playGame();
                }, 1500);
        } else {
            incorrectSound.play();
            clearTimeout(continueGameTimer);
            if (hard.is(":checked")) {
                statusDisplay.html('<div class="gameOver">Game Over </div><br>Oops! That\'s not right!<br>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
            } else {
                statusDisplay.html("<div class='gameOver'>Oops! Not quite right!<br><br> Let's have another try! </div>");
                retry = true;
                newGame = false;
                setTimeout(playGame, 4000);
            }
        }
    }

    // Function - Countdown Timer 
    function timer() {
        var counter = 10;
        var interval = setInterval(function() {
            counter--;
            countdown.html(counter);
            if (counter == 0 && clicked == false) {
                incorrectSound.play();
                clearInterval(interval);
                statusDisplay.html('<div class="gameOver">Time Up! </div>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
            } else if (clicked == true || exitGameButtonClicked == true) {
                clearInterval(interval);
                countdown.html('-');
            }
        }, 1200) // 1.2s used instead of 1s to slightly slow down the timer
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
    
// Function to disable and enable click events    
    function disableClickEvents() {
            colorsButton.off('click');
            exitGame.off("click");
            start.off("click");
        } 
    function enableClickEvents () {
            colorsButton.on('click');
            exitGame.on("click", endGame);
            start.on("click", playGame);
        }

// Function to exit game
    $(document).on("click", "button#yes", yesEndGame); // CREDIT : https://www.tutorialrepublic.com/faq/how-to-bind-click-event-to-dynamically-added-elements-in-jquery.php
    $(document).on("click", "button#no", noEndGame);
    function endGame() {
        statusDisplay.html('<div class="gameOver">Are you sure?</div><br><button type="button" id="yes">yes</button><button type="button" id="no">no</button>');
        exitGameButtonClicked = true;
    }
    function yesEndGame() {
        statusDisplay.html('<div class="gameOver">Game Over </div><br>You scored <span class="displayRed">'+ scores +'</span><br>Press "NEW GAME" to start the game.');
        newGame = true;
        exitGameButtonClicked = false;
    }
    function noEndGame() {
        newGame = false;
        notEndGame = true;
        playGame();
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

