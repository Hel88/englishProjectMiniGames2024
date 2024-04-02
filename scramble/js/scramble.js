const words = [
    "apple", "ball", "cat", "dog", "egg", "fish", "goat", "hat", "ice", "jar",
    "kite", "lion", "moon", "nest", "owl", "pig", "king", "rabbit", "sun", "tiger",
    "umbrella", "van", "wagon", "xylophone", "yak", "ant", "bear", "car",
    "duck", "elephant", "frog", "giraffe", "horse", "igloo", "jelly",
    "lemon", "mouse", "nail", "orange", "pencil", "queen", "robot", "snake",
    "umbrella", "violin", "water","banana", "cherry", 
    "donut", "flamingo",  "hippo", "iguana", "jellyfish",
    "kiwi", "mango", "noodles", "octopus", "penguin", "quail", "rhino", "seal",
    "umbrella", "vulture", "walrus",  "yak", "zebra", "avocado", "broccoli", "carrot",
    "dragonfruit", "eggplant", "fig", "mango",
    "nectarine", "papaya", "quince", "raspberry", "strawberry", "tangerine", "chocolate",
    "vanilla", "watermelon", "zucchini"
];

let numberOfTries = 0;
let scrambledWord;
let currentWordIndex;
let attemptedWords = []; // Array to store attempted words

function scrambleWord(word) {
    return word.split('').sort(function(){return 0.5-Math.random()}).join('');
}

function generateWord() {
    currentWordIndex = Math.floor(Math.random() * words.length);
    scrambledWord = scrambleWord(words[currentWordIndex]);
    document.getElementById('word').textContent = scrambledWord;
    document.getElementById('guessInput').value = '';
    document.getElementById('result').textContent = '';
    attemptedWords = [];
    document.getElementById('attemptedWords').innerHTML = "Attempted Words: ";
}

function checkGuess() {
    const guess = document.getElementById('guessInput').value.toLowerCase();
    document.getElementById('guessInput').value = '';
    if (attemptedWords.includes(guess)) {
        document.getElementById('result').textContent = 'You already tried this word!';
        return;
    }
    attemptedWords.push(guess);
    numberOfTries++;
    document.getElementById('attemptedWords').innerHTML = "Attempted Words: " + attemptedWords.map(word => `<span>${word}</span>`).join(', ');
    if (guess === words[currentWordIndex]) {
        document.getElementById('result').textContent = 'Correct!';
        setTimeout(generateWord, 1000); 
    } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
        if (numberOfTries === 3) {
            alert("You have reached the maximum number of tries. The correct word is " + words[currentWordIndex]);
            numberOfTries = 0;
            setTimeout(generateWord, 1000);
        }
    }
}


generateWord();

document.getElementById('checkButton').addEventListener('click', checkGuess);
document.getElementById('guessInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});


function goToHomeScreen() {
    window.location.href = "../homepage.html";
}