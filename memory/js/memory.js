const words = [
    { english: "Dog", french: "Chien" },
    { english: "Cat", french: "Chat" },
    { english: "Bird", french: "Oiseau" },
    { english: "Tiger", french: "Tigre" },
    { english: "Bear", french: "Ours" },
    { english: "Monkey", french: "Singe" }
];

let gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let score = 0;
let numberOfMoves=0;
var wordsFound = [];


// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the game
function initGame() {
    gameBoard.innerHTML = '';
    cards = [];
    document.getElementById('score').textContent = score;
    document.getElementById('moves').textContent = numberOfMoves;
    //document.getElementById('wordsFound').textContent = wordsFound;
    // Create two cards for each word
    words.forEach(word => {
        for (let i = 0; i < 2; i++) {
            const card = { word: i === 0 ? word.english : word.french, matched: false };
            cards.push(card);
        }
    });
    
    shuffle(cards);

    // Render cards
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = '???';
        cardElement.addEventListener('click', () => flipCard(cardElement, card));
        gameBoard.appendChild(cardElement);
    });
}

// Flip the card
function flipCard(cardElement, card) {
    
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped')) {
        cardElement.textContent = card.word;
        cardElement.classList.add('flipped');
        flippedCards.push({ element: cardElement, word: card.word });

        if (flippedCards.length === 2) {//si 2 cartes sont retournées
            setTimeout(checkMatch, 1000);
            numberOfMoves++;
            document.getElementById('moves').textContent = numberOfMoves;
        }
    }
}

// Check if cards match
function checkMatch() {
    let firstcard = flippedCards[0].word+'';
    let secondcard = flippedCards[1].word+'';
    let firstcard_translation;
    let firstcard_is_english;
    // let word1 = flippedCards[0].word+'';
    // let word2 = flippedCards[1].word+'';

    for (let m = 0; m < words.length; m++) {
        
        if (words[m].english === firstcard){
            firstcard_translation = words[m].french;
            firstcard_is_english = true;
        }
        if (words[m].french === firstcard){
            firstcard_translation = words[m].english;
            firstcard_is_english = false;
        }
    }
    
    if (firstcard_translation === secondcard) {
            flippedCards.forEach(card => {
            card.element.classList.add('matched');
            card.matched = true;
        });
        score++;
        if (firstcard_is_english){
            wordsFound.push({english:firstcard, french:firstcard_translation});
        }else{
            wordsFound.push({english:firstcard_translation, french:firstcard});
        }

        // Sélection du tableau
        var tableBody = document.querySelector('#wordsFound tbody');
        wordsFound.forEach(function(word){
            var row = tableBody.insertRow();
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            cell1.textContent= word.english;
            cell2.textContent = word.french;
        })

        wordsFound=[];
        
        document.getElementById('score').textContent = score;
        if (score === words.length) {
            setTimeout(() => {
                alert('Congratulations! You won the game!');
            }, 500);
        }
    } else {
        //les remettre face cachée
        flippedCards.forEach(card => {
            card.element.classList.remove('flipped');
            card.element.textContent = '???';
        });
    }
    flippedCards = [];
}

// Restart the game
function restartGame() {
    score = 0;
    numberOfMoves = 0;
    flippedCards = [];
    initGame();
    document.getElementById("wordsFound").textContent ="";
}

// Start the game
initGame();

function goToHomeScreen() {
    window.location.href = "../homepage.html";
}
