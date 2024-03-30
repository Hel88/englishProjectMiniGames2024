const words = [
    "apple", "ball", "cat", "dog", "egg", "fish", "goat", "hat", "ice", "jar",
    "kite", "lion", "moon", "nest", "owl", "pig", "queen", "rabbit", "sun", "tiger",
    "umbrella", "van", "wagon", "xylophone", "yak", "zebra", "ant", "bear", "car",
    "duck", "elephant", "frog", "giraffe", "horse", "igloo", "jelly", "kite",
    "lemon", "mouse", "nail", "orange", "pencil", "queen", "robot", "snake", "tiger",
    "umbrella", "violin", "water", "xylophone", "yo-yo", "zebra","banana", "cherry", 
    "donut", "elephant", "flamingo", "giraffe", "hippo", "iguana", "jellyfish",
    "kiwi", "lemon", "mango", "noodles", "octopus", "penguin", "quail", "rhino", "seal", "tiger",
    "umbrella", "vulture", "walrus", "xylophone", "yak", "zebra", "avocado", "broccoli", "carrot",
    "dragonfruit", "eggplant", "fig", "grapes", "honeydew", "jackfruit", "kiwifruit", "lemon", "mango",
    "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine", "chocolate",
    "vanilla", "watermelon", "xigua", "yellow squash", "zucchini"
];

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
    if (attemptedWords.includes(guess)) {
        document.getElementById('result').textContent = 'You already tried this word!';
        return;
    }
    attemptedWords.push(guess);
    document.getElementById('attemptedWords').innerHTML = "Attempted Words: " + attemptedWords.map(word => `<span>${word}</span>`).join(', ');
    if (guess === words[currentWordIndex]) {
        document.getElementById('result').textContent = 'Correct!';
        setTimeout(generateWord, 1000); 
    } else {
        document.getElementById('result').textContent = 'Incorrect. Try again!';
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