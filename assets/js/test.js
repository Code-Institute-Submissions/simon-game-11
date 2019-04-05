$(document).ready(function() {

    // ------------------------------------------------------------------ Variables

    var scoresId = $('#scores');
    var countdown = $("#countdown");
    var trophy = $('.fa-trophy');
    var typeOfAward = $('#award-type');
    var incorrectSound = $('#incorrectSound')[0];
    var status = $('#status');
    var colorsButton = $(".color-btn");
    var start = $("#start");
    var exit = $('#exit');
    var hard = $("#hard");
    var mode = $('#mode');
    var yes = $('#yes');
    var no = $('#no');
    var scores, retry, newGame, colorsClicked;
    var playerSequence, simonSequence, exitClicked, notEndGame;

    // ------------------------------------------------------------------  Functions

    // enableClickEvents() enables all click events associated with buttons e.g. START, EXIT etc

    //exit.on("click", exitGame);

    start.on("click", startNewGame);
    
    // Functions to enable and disable EXIT button
    function disableExitButton() {
        exit.prop('disabled', true);
    }
    function enableExitButton() {
        exit.prop('disabled', false);
    }
    // Functions to enable and disable MODE button
    function enableModeButton() {
        mode.prop('disabled', false);
    }
    function disableModeButton() {
        mode.prop('disabled', true);
    }
    function startNewGame() {
        newGame=true;
        play();
    }

    // play() function is called:
    // when user clicks START button to play new game; 
    // when game is continued as a result of mistake (EASY mode only);
    // when user click EXIT button and then click 'NO' when message appears 'Are you sure?'

    function play() {
        disableModeButton();
        // Here we filter through the reasons for calling playGame function. This is needed so that: 
        // We reset the game in case of new game;
        // We keep the scores when the game is continued by user in case of retry.
        // We increment scores when the player repeats correct sequence.

        if (newGame == false && retry != true && notEndGame != true) {
            scores++;
            scoresId.html(scores);
            console.log('Game continue')
        }
        else if (newGame == false && (retry == true || notEndGame == true)) {
            scores;
            console.log('Retry/NO EXIT')
        }
        else {
            scores = 0;
            scoresId.html(scores);
            simonSequence = [];
            console.log('NEW GAME')
        }

        // Here we call awardType() function to check award type (if any) won by player.

        awardType();

        // We keep the player informed throughout the play so they know what to expect.
        // Here we display to the user that Simon is playing its turn. 

        status.html('Simon playing...');

        // Here we add random color to simonSequence array. 

        function addRandomColor() {
            var colors = ["red", "green", "blue", "yellow"];
            var randomNumber = Math.floor(Math.random() * 4);
            simonSequence.push(colors[randomNumber]);
            return simonSequence;
        }

        // Here we call simonPlay() function which:
        // Disables all click events to avoid situations like 'user clicking on coloured buttons while the simon is playing';
        // Check whether the Simon should play same color sequence (continued game) or updated color sequence (new game);
        // Simon plays the sequence of colours

        simonPlay();

        function simonPlay() {
            disableExitButton();
            disableClickEvents();
            function disableClickEvents() {
                colorsButton.off('click');
                start.off("click");
            }

            if (retry == true || notEndGame == true) {
                simonSequence;
                retry = false; // resets retry 
                notEndGame = false; // resets notEndGame
            }
            else {
                addRandomColor();
            }
            console.log(simonSequence);
            $.each(simonSequence, function(i) {
                setTimeout(function() {
                    var colorId = $("#" + simonSequence[i]);
                    var soundId = $("#" + simonSequence[i] + "Sound")[0];
                    playSound(colorId, soundId);
                }, i * 1000);
            });
        }

        // Here player is prompt to play
        setTimeout(playerTurn, simonSequence.length * 1100);
        
        // Here we enable click events so that the player can play or exit game.
        // In case of hard mode selected, we start the 10s countdown timer.
        // Timer will stop when the user starts the play;
        // Every time user clicks a colour, gameStatus() function is called to check it matches with simon's sequence.  
        
        function playerTurn() {
            enableExitButton();
            playerSequence = [];
            status.html('Your turn to play...');
        
            if (hard.is(":checked")) {
                timer();
                colorsClicked = false; // Timer stops once the value is true (for hard mode only).
            }
            colorsButton.on('click', function() {
                console.log(simonSequence);
                colorsClicked = true; // Timer stops.
                playSound($("#" + this.id), $("#" + this.id + "Sound")[0]);
                playerSequence.push(this.id);
                gameStatus(); // Checks user input and update game accordingly
            });
        }

        // Here we check the game status and display it to the user:
        // If player repeats correct sequence then the game continues by calling play() function;
        // If player makes a mistake, simon repeats the sequence and player gets another try (easy mode);
        // If player makes a mistake, game is over (hard mode).

        function gameStatus() {
            var lastPosition = playerSequence.length - 1; // position of the last item in player sequence
            console.log(playerSequence);
            if (playerSequence[lastPosition] == simonSequence[lastPosition] && playerSequence.length < simonSequence.length) {
                status.html('Well done!');
            }
            else if (playerSequence[lastPosition] == simonSequence[lastPosition] && playerSequence.length == simonSequence.length) {
                status.html('Next play! Get ready!');
                setTimeout(function() {
                    newGame = false; // To avoid score and simon sequence reset
                    play();
                }, 1500);
            }
            else {
                incorrectSound.play(); // 'Razz' sound plays when player makes mistake
                if (hard.is(":checked")) {
                    status.html('<div class="gameOver">Game Over </div><br>Oops! That\'s not right!<br>You scored <span class="displayRed">' + scores + '</span><br>Press "START" to play new game.');
                    enableModeButton();
                    start.on("click", startNewGame);
                    disableExitButton();
                }
                else {
                    status.html("<div class='gameOver'>Oops! Not quite right!<br><br> Let's have another try! </div>");
                    retry = true;
                    newGame = false;
                    setTimeout(play, 4000);
                    disableExitButton();
                }
            }
        }
    }

    //-------------------------------------------------------------------- Functions

    // playSound() function is called when Simon or player plays

    function playSound(colorId, soundId) {
        soundId.play();
        colorId.addClass("shadow-effect");
        setTimeout(noShadowEffect, 100);

        function noShadowEffect() {
            colorId.removeClass("shadow-effect");
        }
    }

    // exitGame() function is called when EXIT button is clicked;
    // yesExit() function is called and game overs when YES button is clicked;
    // noExit() function is called and game continues when NO button is clicked;

    exit.on("click", exitGame);
    function exitGame() {
        $('#exit-options').removeClass('hide');
        $('#status').addClass('hide');
        exitClicked = true;
        colorsButton.off('click');
    }
    yes.on("click", yesExit);
    function yesExit() {
        status.html(`
            <div class="gameOver">Game Over </div><br>You scored <span class="displayRed"> ${scores} </span><br>Press "START" to play the game.
        `);
        enableModeButton();
        exitClicked = false; // reset exitClicked
        disableExitButton();
        start.on("click", startNewGame);
        $('#exit-options').addClass('hide');
        $('#status').removeClass('hide');
    }
    no.on("click", noExit);
    function noExit() {
        $('#exit-options').addClass('hide');
        $('#status').removeClass('hide');
        newGame = false;
        notEndGame = true;
        exitClicked = false; // reset exitClicked
        play();
    }
    // timer function sets 10s countdown timer for hard mode. 
    // Player must start the turn within 10s to avoid losing.

    function timer() {
        disableExitButton();
        var counter = 10;
        var interval = setInterval(function() {
            counter--;
            countdown.html(counter);
            if (counter == 0 && colorsClicked == false) {
                incorrectSound.play();
                clearInterval(interval);
                status.html('<div class="gameOver">Time Up! </div>You scored <span class="displayRed">' + scores + '</span><br>Press "START" to play new game.');
                enableModeButton();
                start.on("click", startNewGame);
                
            }
            else if (colorsClicked == true || exitClicked == true) {
                clearInterval(interval);
                countdown.html('-');
            }
        }, 1200) // 1.2s used instead of 1s to slightly slow down the timer
    }


    // Player is awarded bronze, silver, gold, platinum and diamond trophy based on score count.

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

});
