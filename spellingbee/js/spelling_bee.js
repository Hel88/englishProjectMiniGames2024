// Define word lists for different categories
const wordLists = {
  fruits: ['apple', 'banana', 'cherry', 'lemon', 'pear'],
  vegetables: ['carrot', 'broccoli', 'tomato', 'cucumber', 'spinach']
  // Add more categories and their word lists as needed
};

// Define variables
let currentWordIndex = -1; // Initialize currentWordIndex to -1
let score = 0; // Initialize score to 0
let timerInterval; // Store the interval for the timer
let maxTime = 20; // Change this value to set the initial time limit in seconds
let timeLeft = maxTime; // Initialize time left to the maximum time
let guessedWords = []; // Keep track of the words the player has guessed
let wordList = []; // Define wordList variable
let letterTimeouts = []; // Store timeouts for each letter
let timeout; // Store the timeout for the first letter
let selectedCategory = "fruits"; // Initialize selectedCategory to fruits

// Function to change the category
function changeCategory() {
  const categorySelect = document.getElementById('categorySelect');
  selectedCategory = categorySelect.value;
  
  // Load words based on the selected category
  wordList = wordLists[selectedCategory];
  
  // Reset variables
  currentWordIndex = -1;
  score = 0;
  guessedWords = [];
  timeLeft = maxTime;

  // Clear timeouts
  clearTimeout(timeout);
  for (let timeout of letterTimeouts) {
    clearTimeout(timeout);
  }
  letterTimeouts = [];

  // Update UI
  document.getElementById('score').innerText = `Score: ${score}`;
  document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
  document.getElementById('message').innerText = '';

  // Start the game
  loadScoreboardData(selectedCategory);
  displayWord();
  startTimer(); // Call startTimer again
}

function getRandomWord() {
  return wordList[Math.floor(Math.random() * wordList.length)];
}

function displayWord() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * wordList.length);
  } while (newIndex === currentWordIndex || guessedWords.includes(newIndex)); // Ensure the word is not repeated
  
  currentWordIndex = newIndex;
  guessedWords.push(currentWordIndex); // Add the index to guessedWords array

  const word = wordList[currentWordIndex];
  const image = "img/" + word + ".jpg"; // Change the path to the image folder
  const wordDisplayElement = document.getElementById('wordDisplay');
  wordDisplayElement.innerHTML = ''; // Clear previous word display

  // Display first letter after 5 seconds
  timeout = setTimeout(() => {
    wordDisplayElement.innerText = word.charAt(0).toUpperCase();

    // Calculate delay between each subsequent letter based on maxTime (minus initial 5 seconds) and word length
    const delay = (maxTime - 5) / (word.length - 1) * 1000; // Adjust seconds to milliseconds

    // Display each subsequent letter with a delay
    for (let i = 1; i < word.length; i++) {
      const timeout = setTimeout(() => {
        wordDisplayElement.innerText += word.charAt(i).toUpperCase();
      }, i * delay); // Start delay from 0 for subsequent letters
      letterTimeouts.push(timeout); // Store the timeout
    }
  }, 5000); // Initial 5-second delay for the first letter

  // Display image
  const imageElement = document.getElementById('imageDisplay');
  imageElement.src = image;

  checkEndGame();
}

function checkSpelling() {
  const userInput = document.getElementById('userInput').value.trim().toLowerCase();
  const correctWord = wordList[currentWordIndex]; // Retrieve the correct word from the wordList
  
  // Clear letter timeouts
  for (let timeout of letterTimeouts) {
    clearTimeout(timeout);
  }
  letterTimeouts = [];

  if (userInput === correctWord) {
    // Calculate score based on time left
    const timeBonus = Math.ceil((timeLeft / maxTime) * 100); // Adjust multiplier for scoring
    score += timeBonus;

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('message').innerText = 'Correct!';
    
    // Reset the timer
    timeLeft = maxTime;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

    // Display a new word
    checkEndGame();
    displayWord();
  } else {
    document.getElementById('message').innerText = 'Incorrect. Try again.';
  }

  // Clear input field
  document.getElementById('userInput').value = '';  
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;

    if (timeLeft === 0) {
      clearInterval(timerInterval);
      document.getElementById('message').innerText = 'Time\'s up! Game over.';
      document.getElementById('userInput').disabled = true; // Disable input field when time is up
      document.getElementById('checkButton').disabled = true; // Disable check button when time is up
      document.getElementById('wordDisplay').innerText = wordList[currentWordIndex]; // Display the correct word
      document.getElementById('imageDisplay').src = 'img/go.png'; // Change the path to the image folder
      document.body.classList.add('game-over-background');
      // Call main function with the player's score
      updateScoreboard(score);
    }
  }, 1000); // Update the timer every second
}

function checkEndGame() {
  if (guessedWords.length === wordList.length) {
    // Stop the timer
    clearInterval(timerInterval);
    letterTimeouts.forEach(timeout => clearTimeout(timeout)); // Clear letter timeouts
    document.getElementById('timer').innerText = '';
    document.getElementById('message').innerText = 'Congratulations! You have guessed all the words!';
    document.getElementById('userInput').disabled = true; // Disable input field
    document.getElementById('checkButton').disabled = true; // Disable check button
    document.getElementById('wordDisplay').innerText = ''; // Clear word display
    document.getElementById('imageDisplay').src = 'img/celebrate.png'; // Change the path to the image folder
    updateScoreboard(score); // Call main function with the player's score
  }
}

function restartGame() {
  document.body.classList.remove('game-over-background');
  document.getElementById('userInput').disabled = false;
  document.getElementById('checkButton').disabled = false;
  document.getElementById('userInput').value = '';
  letterTimeouts.forEach(timeout => clearTimeout(timeout)); // Clear letter timeouts
  clearInterval(timerInterval); // Clear the timer interval
  changeCategory();
}

// Main function to handle score input
function updateScoreboard(score) {
    addPlayerScore(score);
}

// Display scores on page load
window.onload = function() {
    loadScoreboardData(category);
    restartGame();
};

// Attach event listener to check button
document.getElementById('checkButton').addEventListener('click', checkSpelling);
document.getElementById('restartButton').addEventListener('click', restartGame);
