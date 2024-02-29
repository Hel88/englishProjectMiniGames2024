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



// Function to change the category
function changeCategory() {
  const categorySelect = document.getElementById('categorySelect');
  const selectedCategory = categorySelect.value;
  
  // Load words based on the selected category
  wordList = wordLists[selectedCategory];
  
  // Reset variables
  currentWordIndex = -1;
  score = 0;
  guessedWords = [];
  
  // Start the game
  displayWord();
  startTimer();
}

  
function getRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
}



function displayWord() {
  // Clear previous timeouts
  for (let timeout of letterTimeouts) {
    clearTimeout(timeout);
  }
  letterTimeouts = [];

  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * wordList.length);
  } while (newIndex === currentWordIndex || guessedWords.includes(newIndex)); // Ensure the word is not repeated
  
  currentWordIndex = newIndex;
  guessedWords.push(currentWordIndex); // Add the index to guessedWords array

  const word = wordList[currentWordIndex];
  const image = "img/" + word + ".jpg"; // Change the path to the image folder
  const wordDisplayElement = document.getElementById('wordDisplay');
  wordDisplayElement.innerHTML = ''; // Clear previous word

  // Display first letter after 5 seconds
  setTimeout(() => {
    wordDisplayElement.innerText = word.charAt(0).toUpperCase();

    // Calculate delay between each subsequent letter based on maxTime and word length
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
  
  if (userInput === correctWord) {
    // Clear letter timeouts
    for (let timeout of letterTimeouts) {
      clearTimeout(timeout);
    }
    letterTimeouts = [];

    // Calculate score based on time left
    const timeBonus = Math.ceil((timeLeft / maxTime) * 100); // Adjust multiplier for scoring
    score += timeBonus;

    document.getElementById('score').innerText = `Score: ${score}`;
    document.getElementById('message').innerText = 'Correct!';
    
    // Reset the timer
    clearInterval(timerInterval);
    timeLeft = maxTime;
    document.getElementById('timer').innerText = `Time left: ${timeLeft} seconds`;
    startTimer(); // Start the timer again
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
    }
  }, 1000); // Update the timer every second
}

function checkEndGame() {
  if (guessedWords.length === wordList.length) {
    // Stop the timer
    clearInterval(timerInterval);
    document.getElementById('timer').innerText = '';
    document.getElementById('message').innerText = 'Congratulations! You have guessed all the words!';
    document.getElementById('userInput').disabled = true; // Disable input field
    document.getElementById('checkButton').disabled = true; // Disable check button
  }
}


// Start the game
changeCategory();

// Attach event listener to check button
document.getElementById('checkButton').addEventListener('click', checkSpelling);
    