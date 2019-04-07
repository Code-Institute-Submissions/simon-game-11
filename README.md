# Simon Game
This website is my second Milestone project in Full Stack web developer course run by Code Institute. 
It is designed to allow users to play 'Simon Game'.

## UX


#### User Stories

###### User Story 1
I am provided game instructions.

###### User Story 2
I am given choice to play either Easy or Hard game mode.

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
* wait for the timer to stop. (hard mode only)

## Features

I have used following features to meet different user needs:


## Limitations


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

##### Timer (Hard mode only)
* Play the game in hard mode and let Simon play its turn. Let the countdown begin 
  and become 0 and verify that the: 
    * 'Razz' sound is played, 
    *  countdown stops and 
    *  message appears, "Time Up! You scored <**Your Scores here**>. Press "START" to play again."
* Play the game in hard mode and let Simon play its turn. Let the countdown begin
  and let player start the correct sequence before the timer becomes 0. Verify that
  countdown stops and game continues as normal.
* Play the game in hard mode and let Simon play its turn. Let the countdown begin
  and let player click 'EXIT' button before the timer becomes 0. Verify that
  countdown stops and game exit options appear, 'Are you sure? YES NO'.

##### Awards
* To simplify testing *Awards* system is working fine, all cases in switch statement 
  were changed as following:
    * case (scores < 10) changed to case (scores < 1)
    * case (scores < 25) changed to case (scores < 2)
    * case (scores < 50) changed to case (scores < 3)
    * case (scores < 75) changed to case (scores < 4)
    * case (scores < 100) changed to case (scores < 5)
    * case (scores >= 100) changed to case (scores >= 5)
  Game was played in both 'Easy' and 'Hard' mode to test the award system is working as intended.
  It was verified that:
    * Scores of 0 got no award;
    * Score of 1 got Bronze award;
    * Score of 2 got Silver award;
    * Score of 3 got Gold award;
    * Score of 4 got Platinum award;
    * All scores equal or greater than 5 got Diamond award.


##### Dev Tools
I made extensive use of Dev Tools during the production of this website to test functioning of my site on different
devices.

##### [HTML validator](https://validator.w3.org/)
HTML validator is used to validate the code. 

* No errors found.
* **Warning:** *Section lacks heading. Consider using h2-h6 elements to add identifying headings to all sections.*
  * This is the only warning raised but no section heading is needed so the warning is ignored.

##### [CSS validator](https://jigsaw.w3.org/css-validator/)

* No errors found.
* **Warning:** *-moz-box-shadow is an unknown vendor extension*
  * Similar other warnings are raised but browser vendors are required to ensure compatibility.

##### Cross Browser Testing
###### Accessibility / Screen Reader Application Testing
## Deployment
## Credits
#### Content
- User stories were written by customising user stories given in https://learn.freecodecamp.org/coding-interview-prep/take-home-projects/build-a-simon-game/
- Game instructions were written by customising instructions given in https://www.hasbro.com/common/instruct/Simon.PDF

#### Acknowledgements
 


