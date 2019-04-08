# Simon Game
This website is my second Milestone project in Full Stack web developer course run by Code Institute. 
It is designed to allow users to play 'Simon Game'.
## How to Play
*Single player game*

###### OBJECT :
Correctly repeat a longer and longer sequence of signals.

Follow the steps below:

* Select game mode by pressing MODE button. You can choose EASY or HARD. In EASY mode, you can continue the game even if you make mistake. In HARD mode, game is over if you make a mistake. Moreover, you have 10 seconds to start your sequence or your time is up.
* Once the game mode is selected, press the START button. Simon will give the first signal. Repeat the signal by pressing the same colour pad.
* Simon will then give two signals and so on. Keep repeating the signals by pressing the same colour pads, in order.
* Continue playing as long as you can repeat each sequence of signals correctly.
* If you fail to repeat a sequence, Simon responds with 'RAZZ' sound. In hard mode, this means game is over and your scores will be displayed. In easy mode, you are still in the game and Simon will play the same sequence for you to try again.

###### AWARDS:
* If you score 10+, you get Bronze cup.
* If you score 25+, you get Silver cup.
* If you score 50+, you get Gold cup.
* If you score 75+, you get Platinum cup.
* If you score 100, you get Diamond cup. You are the 'Winner'. 
  You can still continue playing the game for fun!

## UX
No wireframes were created for this project. Design was kept simple, yet appealing. 

Firstly, very basic design was put in place so the logic side could be worked on.
When basic logic was in place then the page was properly designed keeping the following 
important features in mind:
* Game console with four different colour pads
* Score display
* Game status display
* Start/Exit buttons
* Game instructions

Later on, following desired features were added too:
* Easy/Hard mode
* Award display

##### Game Console
Game console was kept simple with four small squares inside one big square. CSS properties 
like border-radius, linear-gradient and box-shadow were used to enhance the look of 
otherwise simple console.

##### Game Status
To ensure good user experience, it was important to keep user informed of what to 
expect in the game, e.g. 'Simon playing...'. Hence game status area was designed 
for this purpose where such messages are displayed to player.

##### Game Options
Simple bootstrap [buttons](https://getbootstrap.com/docs/4.0/components/buttons/) 
were used to display game options e.g. start, exit, mode and help. The purpose 
of these buttons are obvious from the names and they are easy to locate. Moreover,
game status area also makes it clear the purpose of the buttons.

##### Game Instructions
Bootstrap [modal](https://getbootstrap.com/docs/4.3/components/modal/) was used
for game instructions. This is because player does not need to keep seeing
the game instruction if they are familiar with game rules and award system. 

##### Scores/Award/Timer
The information on scores/awards/timer were kept on the top of the page as it is 
considered more intuitive to check for these features on the top rather than the 
bottom of the page.

##### Fonts
* [Acme](https://fonts.google.com/specimen/Acme) was used for main heading.
* [Exo](https://fonts.google.com/specimen/Exo) was used for game status display
  and option buttons at the bottom.
* [Orbitron](https://fonts.google.com/specimen/Orbitron) was used for scores, awards 
   and timer display on the top of the page.

##### Media Queries
No media queries were used. The website was made responsive for all devices using only bootstrap classes. 

## User Stories

###### User Story 1
I am provided with game instructions.

###### User Story 2
I am given the choice to play either Easy or Hard game mode.

###### User Story 3
I am presented with random sequence of button presses and hear a sound that corresponds to each pressed button.

###### User Story 4
I must start my series of button presses within 10 seconds or the game is over. (hard mode only)

###### User Story 5
Each time I input a series of button presses correctly, I earn 1 score.

###### User Story 6
Each time I input a series of button presses correctly, I am presented with the 
same series of button presses but with an additional step.

###### User Story 7
I am notified when I press a wrong button. Then:
- (easy mode) the series of button presses starts again to remind me of the pattern so I can try again.
- (hard mode) the game is over. 

###### User Story 8
I can check my scores throughout the play.

###### User Story 9
I can win a award by getting certain scores.

###### User Story 10
If I want to exit the game, I can:
* hit a button to do so. (easy mode only)
* wait for the timer to stop or make a mistake. (hard mode only)

## Features

I have used following features to meet different user needs:
* User 1 can click on **HELP** button to access game instructions.
* User 2 can click on **MODE** button to choose EASY or HARD mode.
* Four different sounds are used for the colour buttons. Box-shadow CSS property 
  is used to give the effect of button click. User 3 can see the button clicks and
  hear the unique sound of each colour button.
* User 4 can choose the **HARD** mode to enable countdown timer which requires user
  to start the sequence within 10s or lose the game.
* For every right sequence played by player, score is incremented by 1 and displayed
  to user. User 5 can see the score being incremented by 1 for each correct sequence played.
* Simon starts with pressing one randomly selected colour button. If the player
  presses the same colour button then Simon presses the same colour button and one more
  randomly selected colour button on its turn. This process continues... This satisfies
  user 6 needs.
* User 7 will hear the **RAZZ** sound indicating that the input sequence is incorrect.
  In case of easy mode, User 7 will continue the game. Otherwise, game ends.
* User 8 can check the scores on score display throughout the game. In case of
  losing or exiting the game, final scores are displayed on game status as well.
* User 9 can earn Bronze award for 10+ scores, Silver award for 25+ scores, Gold
  award for 50+ scores, Platinum award for 75+ scores and Diamond for 100+ scores.
* (easy mode only) **EXIT** button is enabled for User 10 when it is their turn to 
  play and they can decide to either continue or exit the game.
* (hard mode only) **EXIT** button is disabled during play. User 10 can wait for 
   timer to stop or play a wrong sequence to exit out of the game.

## Limitations
* Game console can be designed to look more like real Simon console. 
* Sounds that match the real Simon game sound can be used instead of piano sounds
  used.

## Technologies Used

The website is designed using following technologies:
- HTML
- CSS
- JavaScript
- [Jquery](https://jquery.com/download/)
- [Font Awesome library](https://fontawesome.com/)
- [Font Awesome Animation](http://l-lin.github.io/font-awesome-animation/)
- [Bootstrap 4 framework](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
- [Google fonts](https://fonts.google.com/)

## Testing
All tests were carried out manually.

##### Default Settings

    1. Click the MODE button and verify that EASY mode is the default setting.
    2. Load the website and verify that the default message on game status display is: 
    
        Press HELP to read game instructions.  
        Press MODE to choose your game mode.   
        Press START to begin the game.  
        
    3. Load the website and verify that scores, awards and timer displays have no entry.
    4. Load the website and verify that the EXIT button is disabled.
    5. Click HELP button and verify that modal appears with game instructions. It can
       be closed by pressing the close button on the top right corner of modal window.
    6. Click on every coloured button and verify that all are disabled.

##### Basic tests for game played in any mode


    1.  Click the START button and verify that scores display 0, game status displays "Simon playing..."
    2.  Verify that Simon presses a single coloured button.
    3.  Verify when Simon presses the button a sound is heard and button press effect is seen.
    4.  To verify that Simon has pressed a random colour button, refresh the page and repeat 
        verification steps 1-2. Keep refreshing the page and repeating steps 1-2 until fully satisfied 
        that Simon is in fact randomly pressing the colour button. This procedure may have to be
        repeated quite a few number of times as it is possible to choose randomly and yet end up having 
        consecutively same colours.
    5.  Verify that once Simon finish playing, game status displays "Your turn to play.."
    6.  Verify that if player presses the same button, game status displays "Next play! Get Ready!". 
    7.  Verify that score display changes to 1.
    8.  Verify that game status displays "Simon playing..."
    9.  Verify that Simon presses the same colour button as before and then randomly presses one more 
        colour button. This time sequence played by Simon has length of 2.
    10. Again verify that once Simon finishes its turn, the game status displays "Your turn to play.."
    11. Verify that if player presses the same first button, game status displays "Well done..". When 
        the second button is pressed correctly then game status changes to "Next play! Get Ready!".
    12. Continue the game and verify that Simon repeats the previous sequence and every time increases 
        the sequence length by 1, by adding another randomly pressed colour to the sequence.
    13. Keep the game going and verify that for every correct sequence played by player, the score is 
        incremented by 1 and current score is displayed on scores display.
    14. Click on any colour button while Simon is playing and verify that all buttons remain disabled 
        until Simon finishes playing its sequence. The buttons are only enabled when it is the player's 
        turn.

##### Awards for any mode
To make it simple to test awards system, all cases in switch statements were changed as following:

    1. case (scores < 10) changed to case (scores < 1) (No award)
    2. case (scores < 25) changed to case (scores < 2) (Bronze award)
    3. case (scores < 50) changed to case (scores < 3) (Silver award)
    4. case (scores < 75) changed to case (scores < 4) (Gold award)
    5. case (scores < 100) changed to case (scores < 5) (Platinum award)
    6. case (scores >= 100) changed to case (scores >= 5) (Diamond award)

  Game was played in both modes and it was verified that:
  
    1. Score of 0 got no award;
    2. Score of 1 got Bronze award;
    3. Score of 2 got Silver award;
    4. Score of 3 got Gold award;
    5. Score of 4 got Platinum award;
    6. All scores equal or greater than 5 got Diamond award.


##### Easy Mode
    1. Click MODE button, choose the "Easy" mode, click START button and let Simon play its sequence.
    2. Repeat the sequence incorrectly and verify that the:
    
       i. "Razz" sound is played,
       ii.  game status displays message, "Oops! Not quite right! Let's have another try!"
       
    3. Repeat Step 2 as many times as you like and verify that "Razz" sound is played, same message as 
       above is displayed and game continues.
    4. Let Simon play its turn and message display, "Your turn to play..". Verify that no change will 
       happen until you continue the game or exit the game.

##### Hard Mode
    1. Click MODE and select HARD mode. 
    2. Let Simon play its turn and message display, "Your turn to play". Verify that 10s countdown 
       timer starts.
    3. Let the countdown become 0 and verify that the: 
    
        i. "Razz" sound is played, 
        ii. countdown stops, and 
        iii. message appears, "Time Up! You scored <Your Scores here>. Press "START" to play again."
        
    4. Let the countdown begin and let player start the correct sequence before the timer becomes 0. 
       Verify that countdown stops and game continues as normal.
    5. Let the player play wrong sequence and verify that:
    
        i. "Razz" sound is played, 
        ii. message appears, "Game Over! You scored <Your Scores here>. Press "START" to play again."
    

##### Exit Game
    1. In hard mode, verify that EXIT button remains disabled throughout the game.
    2. In easy mode, click START and verify that EXIT button remains disabled until it is player's 
       turn to play.
    3. In easy mode, when it is player's turn and EXIT button is enabled. 
       Click EXIT button and verify that game status displays :
       
       Are you sure?  
       YES  NO
       
    4. Click YES and verify that game status displays:
    
       Game Over 
       You scored <Your Scores here>   
       Press 'START' to play new game.
    
    5. Click NO and verify that Simon plays the previously played sequence again and game continues 
       as normal.   
    6. Click START and verify that game starts as a new game. All game scores or awards won are 
       removed. 

##### Issues found
    
    1. On some occasions, it has been found that if the sequence is played too quickly, the sound does 
       not play. In such cases, button click is still seen and the pressed button is still recorded in 
       the sequence. It does not affect the result of the scores.
    2. Sometimes when the website is loaded first time on Google Chrome, sound would not work and then 
       start working after few clicks. In this case as well button click is clearly seen.

##### HTML validator 
[W3 Validator](https://validator.w3.org/) is used to validate the HTML code. 
    
    1. No errors found.
    2. The only warning raised was "Section lacks heading. Consider using h2-h6 elements to add 
       identifying headings to all sections.". This warning is ignored because no section heading is 
       needed.

##### CSS validator 
[W3 validator](https://jigsaw.w3.org/css-validator/) is used to validate the CSS code.

    1. No errors found.
    2. The warnings raised were of kind, "-moz-box-shadow is an unknown vendor extension". These warnings
       were ignored because browser vendors are required to ensure compatibility.

##### JS validator
[JS Lint](https://www.jslint.com/) is used to validate the JS code.

    1. No errors found.
    2. The warnings raised were of kind, "Unexpected trailing space". These warnings were ignored 
       as spaces improved code readability. 

##### Cross Browser Testing
[CanIuse.com](https://caniuse.com/)

    This website was used to check browser support for CSS codes and use correct prefixes, where 
    required.

The website was tested to function as expected on following browsers:

    Chrome (sometimes sound stops working and then starts working itself)
    Firefox
    IE 
    Edge 
    Samsung A3 Internet Browser
    Safari (Box-shadow property does not work)

##### Responsiveness Testing:
Dev Tools, iphone X and iPad were used to test the appearance of website on mobile/tablet screen size.  
Following issues were found:

    1. Box shadow property is not working in iPhone X and iPad Safari which makes the background colour 
       plain black.
    2. Website looks fine on mobile devices in portrait but in landscape the game status overlaps the 
       game console.

##### Accessibility / Screen Reader Application Testing
Following ARIA attributes were used to make website as accessible as possible:

    Aria-hidden = true is used with fonts awesome to hide the fonts from screen readers.
    Aria-haspopup = true is used for dropdown MODE button. 
    Aria-expanded = false is used for dropdown MODE button which is uncollapsed by default.
    Aria-label = Close and Aria-hidden = true is used for modal close button. 

## Deployment
The website was deployed using [github pages](https://pages.github.com/).
Following steps were taken to deploy the website:
1. Created a remote repository with name 'simon-game'.
3. Pushed the local git repository to the remote repository using the following commands
    1. git remote add origin https://github.com/maria-mir/simon-game.git
    2. git push -u origin master
4. Clicked 'settings' in simon-game repository page.
5. Scrolled down to 'Github Pages' and chose 'Master Branch' from the dropdown menu.
6. Clicked save and waited for few minutes for the live website link to appear.
7. Once the link appear, website was successfully deployed.

###### Changes
Following changes were made after deployment:
* Updated README.md file, and 
* Corrected source path of five audio files.

## Credits

##### Content
- User stories were written by customising user stories given in [freecodecamp](https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/build-a-simon-game/)
- Game instructions were written by customising instructions given in [hasbro](https://www.hasbro.com/common/instruct/Simon.PDF)
- Sounds were used from the website [Freesound](https://freesound.org/search/?q=piano+keys)

##### Research material used 
I made use of the following research material during the production of this website.

1) How to remove multiple classes in Jquery? [(Stackoverflow)](https://stackoverflow.com/questions/1485647/removing-multiple-classes-jquery)
2) How to create countdown timer? [(Stackoverflow)](https://stackoverflow.com/questions/44314897/javascript-timer-for-a-quiz?noredirect=1&lq=1)
3) How to play audio using Javascript? [(Stackoverflow)](https://stackoverflow.com/questions/8489710/play-an-audio-file-using-jquery-when-a-button-is-clicked)
4) How to check if radio button is checked in javascript/jquery? [(Stackoverflow)](https://stackoverflow.com/questions/1423777/how-can-i-check-whether-a-radio-button-is-selected-with-javascript)
5) How to loop through an array in Jquery? [(Jquery documentation)](http://api.jquery.com/jquery.each/)
6) How to use setTimeout function? [(freecodecamp)](https://medium.freecodecamp.org/javascript-timers-everything-you-need-to-know-5f31eaa37162)

## Acknowledgements
- I would like to thank my tutor Antonija Simic for all her help and support during the development of this project.   
- I would also like thank my daughter Zoya for testing out the game on her Samsung Galaxy A3 device.  

 


