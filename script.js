// global constants
const cluePauseTime = 333; //how long to pause in between clues
const nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
var pattern = [1, 6, 4, 3, 2, 5, 2, 1];
var progress = 0; 
var gamePlaying = false;
var tonePlaying = false;
var volume = 0.5;  //must be between 0.0 and 1.0
var guessCounter = 0;
var clueHoldTime = 1000; //how long to hold each clue's light/sound
var mistakeCounter = 0;

function generatePattern(){ // generate random pattern at the beginning of each game
  for(let i=0;i<pattern.length;i++){
    pattern[i] = Math.floor(Math.random() * 6) + 1;
  }
  console.log(pattern);
}

function startGame(){
    //initialize game variables
    progress = 0;
    mistakeCounter = 0;
    gamePlaying = true;
    // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.add("hidden");
    document.getElementById("stopBtn").classList.remove("hidden");
    document.getElementById("startMsg").classList.add("hidden");
    document.getElementById("endMsg").classList.remove("hidden");
    generatePattern();
    playClueSequence();
}

function stopGame(){
    //update game variables
    gamePlaying = false;
    // swap the Start and Stop buttons
    document.getElementById("startBtn").classList.remove("hidden");
    document.getElementById("stopBtn").classList.add("hidden");
    document.getElementById("startMsg").classList.remove("hidden");
    document.getElementById("endMsg").classList.add("hidden");
    document.getElementById("tryAgain").classList.add("hidden");
}

function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}

function playClueSequence(){
  guessCounter = 0;
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    console.log("play single clue: " + pattern[i] + " in " + delay + "ms")
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime;
    delay += cluePauseTime;
    clueHoldTime=clueHoldTime*0.95;
  }
}

function guess(btn){
  console.log("user guessed: " + btn);
  
  if(!gamePlaying){
    return;
  }

  // game logic
  if(pattern[guessCounter]==btn){ // correct guess
    document.getElementById("tryAgain").classList.add("hidden");
    if(guessCounter == progress){ // for the latest guess
      if(progress == pattern.length-1){ // if last turn
        winGame(); // win game
      }
      else{ // if not last guess, continue clues
        progress++;
        playClueSequence();
      }
    }
    else{ // turn not over, check next guess
      guessCounter++;
    }
  }
  else{ // incorrect guess
    if(mistakeCounter<2){
      document.getElementById("tryAgain").classList.remove("hidden");
      mistakeCounter++;
    }
    else{
      loseGame();
      document.getElementById("tryAgain").classList.add("hidden");
    }
  }
}

function loseGame(){
  stopGame();
  alert("Game Over. Better luck next time.");
}
function winGame(){
  stopGame();
  alert("Game Over. You did it! Keep that ~jazzy~ improv to yourself!");
}

//Page Initialization
// Init Sound Synthesizer
window.AudioContext = window.AudioContext || window.webkitAudioContext; // browser compatibility
var context = new AudioContext()
var o = context.createOscillator()
var g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)

// Sound Synthesis Functions
const freqMap = {
  1: 261.6,
  2: 311.1,
  3: 349.2,
  4: 370,
  5: 392,
  6: 466.2,
}
function playTone(btn,len){ 
  o.frequency.value = freqMap[btn]
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = freqMap[btn]
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

function unmute(){
  o.start(0) // work around for Autoplay Policy
  document.getElementById("unmuteBtn").classList.add("hidden");
}