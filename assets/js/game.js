$(document).ready(function() {
    
// ------------------------------------------------------------------ Variables

    var scoresId = $("#scores");
    var countdown = $("#countdown");
    var trophy = $(".fa-trophy");
    var trophyType = $("#trophy-type");
    var incorrectSound = $("#incorrectSound")[0];
    var status = $("#status");
    var colorsButton = $(".color-btn");
    var start = $("#start");
    var exit = $("#exit");
    var exitOptions = $("#exit-options");
    var hard = $("#hard");
    var mode = $("#mode");
    var yes = $("#yes");
    var no = $("#no");
    var playAgain = "Press 'START' to play new game.";
    var scores, retry, newGame, colorsClicked;
    var playerSequence, simonSequence, notEndGame;

// --------------------------------------------------- Enable or disable buttons

//  EXIT button

    function enableExitButton() {
        exit.prop("disabled", false);
    }
    function disableExitButton() {
        exit.prop("disabled", true);
    }
    
//  MODE button

    function enableModeButton() {
        mode.prop("disabled", false);
    }
    function disableModeButton() {
        mode.prop("disabled", true);
    }
    
//  START button

    function enableStartButton() {
        start.prop("disabled", false);
    }
    function disableStartButton() {
        start.prop("disabled", true);
    }

//  Coloured buttons

    function disableColorButtons() {
        colorsButton.off("click");
    }
    
// ---------------------------------------------------------------------- Awards
    
//  Based on score count, player is awarded different trophies. 

    function awardType() {
        console.log(scores);
        switch (true) {
            case (scores < 10):
                trophy.addClass("transparent");
                trophyType.html("Award");
                break;
            case (scores < 25):
                trophy.addClass("bronze");
                trophyType.html("Bronze");
                break;
            case (scores < 50):
                trophy.addClass("silver");
                trophyType.html("Silver");
                break;
            case (scores < 75):
                trophy.addClass("gold");
                trophyType.html("Gold");
                break;
            case (scores < 100):
                trophy.addClass("platinum");
                trophyType.html("Platinum");
                break;
            case (scores >= 100):
                trophy.addClass("diamond");
                trophyType.html("Diamond");
                break;
            default:
                trophy.addClass("hide");
                trophyType.html("Award");
        }
    }
    
//------------------------------------------------------ Sound and shadow effect

//  This function is called when Simon or player click any colour button

    function playSound(colorId, soundId) {
        soundId.play();
        colorId.addClass("shadow-effect");
        setTimeout(noShadowEffect, 100);

        function noShadowEffect() {
            colorId.removeClass("shadow-effect");
        }
    }
    
//-------------------------------------------------------------- Countdown timer

//  Player must start the turn within 10s to avoid losing. (hard mode only)

    function timer() {
        disableExitButton();
        var counter = 10;
        var interval = setInterval(function() {
            counter--;
            countdown.html(counter);
            if (counter == 0 && colorsClicked == false) {
                incorrectSound.play();
                clearInterval(interval);
                status.html(`
                <div class="font">Time Up! </div>
                <p>You scored <span class="red"> ${scores} </span>
                <br> ${playAgain}</p>`);
                enableModeButton();
                enableStartButton();
            }
            else if (colorsClicked == true) {
                clearInterval(interval);
                countdown.html("-");
            }
        }, 1200) // 1.2s used instead of 1s to slightly slow down the timer
    }
    
//-------------------------------------------------------------------- Exit Game
    
//  exitGame function is called when EXIT button is clicked;

    exit.on("click", exitGame);
    function exitGame() {
        exitOptions.removeClass("hide");
        status.addClass("hide");
        disableColorButtons();
    }
    
//  yesExit function is called and game overs when YES button is clicked;

    yes.on("click", yesExit);
    function yesExit() {
        exitOptions.addClass("hide");
        status.removeClass("hide");
        status.html(
        `<div class="font"> Game Over </div>
         <p>You scored <span class="red"> ${scores} </span> 
         <br> ${playAgain}.</p>`);
        enableModeButton();
        disableExitButton();
        enableStartButton();
    }
    
//  noExit function is called and game continues when NO button is clicked;

    no.on("click", noExit);
    function noExit() {
        exitOptions.addClass("hide");
        status.removeClass("hide");
        newGame = false;
        notEndGame = true;
        play();
    }
  
//------------------------------------------------------------------- Start Game

//  startNewGame function is called when START button is clicked;   

    disableExitButton();
    start.on("click", startNewGame);
    function startNewGame() {
        newGame=true;
        play();
    }

/*  play function is called:
        1) when user clicks START button to play new game; 
        2) when game is continued as a result of mistake (EASY mode only);
        3) when user click EXIT button and then select option 'NO'.           */
                                                                              
    function play() {
        disableModeButton(); 
        disableColorButtons(); 
        
/*  Here we filter through the reasons for calling play function. 
    This is needed so that: 
        1) We increment scores when the player repeats correct sequence.
        2) We keep same scores when game is continued (Retry or NO Exit)
        3) We reset the game in case of new game;                             */
                                                                              
        if (newGame == false && retry == false && notEndGame == false) {
            scores++;
            scoresId.html(scores);
        }
        else if (newGame == false && (retry == true || notEndGame == true)) {
            scores;
        }
        else {
            trophy.removeClass("bronze silver gold platinum diamond");
            scores = 0;
            scoresId.html(scores);
            simonSequence = [];
        }
        
//  awardType function is called to check award type (if any) won by player.

        awardType();

/*  Player is kept informed throughout the play so they know what to expect.
    Here we display to the user that Simon is playing its turn.               */
                                                                              
        status.html("Simon playing...");

//  Here we add random color to simonSequence array. 

        function addRandomColor() {
            var colors = ["red", "green", "blue", "yellow"];
            var randomNumber = Math.floor(Math.random() * 4);
            simonSequence.push(colors[randomNumber]);
            return simonSequence;
        }

/*  Here we call simonPlay function which:
        1) Disables EXIT and START buttons to avoid situations like 'user 
           clicking on EXIT button while Simon is playing';
        2) Check whether the Simon should play same sequence (Retry or No Exit) 
           or sequence with additional colour (normally continued game);
        3) Simon plays the sequence of colours                                */
        
        simonPlay();
        function simonPlay() {
            disableExitButton();
            disableStartButton();
            
            if (retry == true || notEndGame == true) {
                simonSequence; // previous simon sequence 
                retry = false; // resets retry 
                notEndGame = false; // resets notEndGame
            }
            else {
                addRandomColor(); // another colour added to previous simon sequence
            }
            $.each(simonSequence, function(i) {
                setTimeout(function() {
                    var colorId = $("#" + simonSequence[i]);
                    var soundId = $("#" + simonSequence[i] + "Sound")[0];
                    playSound(colorId, soundId);
                }, i * 1000);
            });
        }

//  Player is prompt to play

        setTimeout(playerTurn, simonSequence.length * 1100);
        
/*  playerTurn function:
        1) Enables EXIT button to allow player to exit game (easy mode only).
        2) Start/Stop 10s countdown timer (hard mode only).
        3) Call gameStatus function to check player sequence matches with 
           Simon's sequence.                                                  */
           
        function playerTurn() {
            enableExitButton();
            playerSequence = [];
            status.html("Your turn to play...");
            if (hard.is(":checked")) {
                timer();
                colorsClicked = false; // Timer stops once the value is true.
            }
            colorsButton.on("click", function() {
                colorsClicked = true; // Timer stops.
                playSound($("#" + this.id), $("#" + this.id + "Sound")[0]);
                playerSequence.push(this.id);
                gameStatus(); // Checks user input and update game accordingly
            });
        }

/*  Here we check the game status and display it to the user:
        1) If player repeats correct sequence then the game continues by calling
           play function;
        2) If player makes a mistake, simon repeats the sequence and player gets
           another try (easy mode only);
        3) If player makes a mistake, game is over (hard mode only).          */

        function gameStatus() {
            // position of the last item in player sequence
            var lastPosition = playerSequence.length - 1; 
            if (playerSequence[lastPosition] == simonSequence[lastPosition] && 
                playerSequence.length < simonSequence.length) {
                status.html(`<p>Well done!</p>`);
            }
            else if (playerSequence[lastPosition] == simonSequence[lastPosition] 
                     && playerSequence.length == simonSequence.length) {
                status.html(`<p>Next play! Get ready!</p>`);
                disableColorButtons();
                setTimeout(function() {
                    newGame = false; // To avoid score and simon sequence reset
                    retry = false;
                    notEndGame = false;
                    play();
                }, 2000);
            }
            else {
                incorrectSound.play(); // 'Razz' sound plays when player makes mistake
                if (hard.is(":checked")) {
                    status.html(
                    `<div class="font">Game Over </div>
                     <p>Oops! That's not right!<br>
                        You scored <span class="red"> ${scores} </span><br> 
                        ${playAgain}.</p>`);
                    enableModeButton();
                    enableStartButton();
                    disableExitButton();
                }
                else {
                    status.html(
                    `<div class="font"> Oops! Not quite right!</div>
                     <p>Let's have another try! </p>`);
                    retry = true;
                    newGame = false;
                    setTimeout(play, 4000);
                    disableExitButton();
                }
            }
        }
    }
});
