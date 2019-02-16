$(document).ready(function(){
   
// function to generate random color sequence for computer
   var colors = ["red", "green", "blue", "yellow"];
    var computerSequence = [];
   function generateRandomColorSequence(sequenceLength) {
       for (var i=0; i<sequenceLength; i++) {
            var randomNumber = Math.floor(Math.random()*4);
           computerSequence.push(colors[randomNumber]);
       }
       return computerSequence;
   }
    // function test
    console.log(generateRandomColorSequence(7));
    
    
});