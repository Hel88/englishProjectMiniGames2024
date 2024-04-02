// Define the words to guess
const wordLists = {
  fruits: ['apple', 'banana', 'cherry', 'lemon', 'pear','coconut','mango','orange','raspberry','strawberry'],
  vegetables: ['carrot', 'tomato', 'salad', 'broccoli', 'radish', 'pumpkin', 'eggplant', 'beet', 'pepper', 'zucchini'],
  colors: ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'brown', 'black', 'white']
};

// Define variables
let score = 0; // Initialize score to 0
let maxTime = 20; // Change this value to set the initial time limit in seconds
let wordsToFind = []; // Define the words to find
let currentWord = ""; // Initialize currentWord to an empty string
let selectedCategory = "fruits"; // Initialize selectedCategory to fruits
let timeLeft = maxTime; // Initialize time left to the maximum time
let clueInterval; // Declare clue interval globally
let timerInterval; // Declare timer interval globally


function resetGame(){
  currentWord = "";
  score = 0;
  timeLeft = maxTime;
  wordsToFind = []
  clearInterval(clueInterval);
  clueInterval = null;
  clearInterval(timerInterval);
  timerInterval = null;

  // Reset the UI
  document.body.classList.remove('game-over-background');
  document.getElementById('userInput').disabled = false;
  document.getElementById('checkButton').disabled = false;
  document.getElementById('userInput').value = '';
  document.getElementById('score').innerText = `Score: ${score}`;
  document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
  document.getElementById('message').innerText = '';
  document.getElementById('wordDisplay').innerText = '';
  document.getElementById('imageDisplay').src = '';
}

function displayWord() {
  // Clear any existing clue interval
  clearInterval(clueInterval);
  
  currentWord = getRandomWord();
  document.getElementById('wordDisplay').textContent = "";
  startTimer();
  printClue(currentWord);
  printImage(currentWord);
}

function getRandomWord() {
  let word = wordsToFind[Math.floor(Math.random() * wordsToFind.length)];
  wordsToFind.splice(wordsToFind.indexOf(word), 1);
  return word;
}

function printClue(word) {
  let index = 0;
  clueInterval = setInterval(function() {
      if (index < word.length) {
          document.getElementById('wordDisplay').textContent += word[index];
          index++;
      } else {
          clearInterval(clueInterval);
      }
  }, maxTime * 1000 / word.length);
}

function clearClue() {
  document.getElementById('wordDisplay').textContent = "";
}

function printImage(word) {
  const image = document.getElementById('imageDisplay');
  image.src = `img/${selectedCategory}/${word}.jpg`;
  image.alt = word;
}

function checkSpelling(){
  const word = document.getElementById('userInput').value.trim().toLowerCase();
  if (word === currentWord) {
      const timeBonus = Math.ceil((timeLeft / maxTime) * 100); // Adjust multiplier for scoring
      score += timeBonus;

      document.getElementById('score').innerText = `Score: ${score}`;
      document.getElementById('message').innerText = 'Correct!';

      timeLeft = maxTime;
      document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

      clearClue();
      clearInterval(timerInterval);
      checkEndGame();
  } else {
      document.getElementById('message').innerText = 'Incorrect! Try again.';
  }
  // Clear the input field
  document.getElementById('userInput').value = '';
}

function startTimer(){
  timerInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

      if (timeLeft === 0) {
          clearInterval(timerInterval);
          checkEndGame();
      }
  }, 1000);
}

function checkEndGame(){
  if (wordsToFind.length === 0) {
      //clear the timer
      clearInterval(timerInterval);

      //clear the word display
      document.getElementById('wordDisplay').innerText = '';
      clearClue();
      clearInterval(clueInterval);  

      document.getElementById('timer').innerText = '';
      document.getElementById('message').innerText = 'Congratulations! You have guessed all the words!';
      document.getElementById('userInput').disabled = true; // Disable input field
      document.getElementById('checkButton').disabled = true; // Disable check button
      document.getElementById('wordDisplay').innerText = ''; // Clear word display
      document.getElementById('imageDisplay').src = 'img/celebrate.png'; // Change the path to the image folder
      addPlayerScore(score); // Call main function with the player's score
  }else if (timeLeft <= 0){
      //clear the timer
      clearInterval(timerInterval);

      //clear the word display
      document.getElementById('wordDisplay').innerText = '';
      clearClue();
      clueInterval = null;
      document.getElementById('timer').innerText = '';
      document.getElementById('message').innerText = 'Game over! You ran out of time.';
      document.getElementById('userInput').disabled = true; // Disable input field
      document.getElementById('checkButton').disabled = true; // Disable check button
      document.getElementById('imageDisplay').src = 'img/go.png'; // Change the path to the image folder
      document.body.classList.add('game-over-background');
      updateScoreboard(score); // Call main function with the player's score
  }  else {
      displayWord();
  }
}

function updateScoreboard(score) {
  addPlayerScore(score);
}

function launchGame() {
  resetGame();
  const categorySelect = document.getElementById('categorySelect');
  if (categorySelect !== selectedCategory){
    selectedCategory = categorySelect.value;
  }
  wordsToFind = wordLists[selectedCategory];
  loadScoreboardData(selectedCategory);
  displayWord();
}

window.onload = function() {
  launchGame();
};

// Attach event listener to check button
document.getElementById('checkButton').addEventListener('click', checkSpelling);
document.getElementById('restartButton').addEventListener('click', launchGame);

document.getElementById('userInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
      checkSpelling();
  }
});


function goToHomeScreen() {
  window.location.href = "../homepage.html";
}