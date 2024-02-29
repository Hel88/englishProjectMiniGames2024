const wordList = ['apple', 'banana', 'cherry', 'orange', 'grape'];
let currentWordIndex = -1;
let score = 0;
let timerInterval;
let maxTime = 20; // Change this value to set the initial time limit in seconds
let timeLeft = maxTime;
let guessedWords = []; // Keep track of the words the player has guessed

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
    const wordDisplayElement = document.getElementById('wordDisplay');
    wordDisplayElement.innerHTML = ''; // Clear previous word
  
    // Display first letter after 5 seconds
    setTimeout(() => {
      wordDisplayElement.innerText = word.charAt(0);
    }, 5000);
  
    // Calculate delay between each subsequent letter based on maxTime and word length
    const delay = (maxTime - 5) / (word.length - 1) * 1000; // Convert seconds to milliseconds
  
    // Display each subsequent letter with a delay
    for (let i = 1; i < word.length; i++) {
      setTimeout(() => {
        wordDisplayElement.innerText += word.charAt(i);
      }, 5000 + (i - 1) * delay); // Add 5000 ms to account for the delay before the first letter
    }
    
    // Check if all words have been guessed
    if (guessedWords.length === wordList.length) {
      // Stop the timer
      clearInterval(timerInterval);
      document.getElementById('timer').innerText = '';
      document.getElementById('message').innerText = 'Congratulations! You have guessed all the words!';
      document.getElementById('userInput').disabled = true; // Disable input field
      document.getElementById('checkButton').disabled = true; // Disable check button
    }
  }
  

function checkSpelling() {
  const userInput = document.getElementById('userInput').value.trim().toLowerCase();
  const correctWord = wordList[currentWordIndex];
  
  if (userInput === correctWord) {
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

// Start the game
displayWord();
startTimer();

// Attach event listener to check button
document.getElementById('checkButton').addEventListener('click', checkSpelling);
    