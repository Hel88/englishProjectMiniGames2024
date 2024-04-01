const animals = [
    { english: "Dog", french: "Chien" },
    { english: "Cat", french: "Chat" },
    {english: "Horse", french: "Cheval"},
    {english: "Cow", french: "Vache"},
    {english: "Sheep", french: "Mouton"},
    {english: "Rabbit", french: "Lapin"},
    {english: "Goat", french: "Chèvre"},
    // {english: "Pig", french: "Cochon"},
    // {english: "Chicken", french: "Poulet"},
    // {english: "Turkey", french: "Dinde"},
    // { english: "Mouse", french: "Souris" },
]
    
//     { english: "Tiger", french: "Tigre" },
//     { english: "Bear", french: "Ours" },
//     { english: "Monkey", french: "Singe" },
//     { english: "Bird", french: "Oiseau" },
//     {english: "Chicken", french: "Poulet"},
//     {english: "Turkey", french: "Dinde"},
//     {english: "Goose", french: "Oie"},
//     {english: "Duck", french: "Canard"},

const aquaticAnimals = [
    {english: "Frog", french: "Grenouille"},
    {english: "Fish", french: "Poisson"},
    {english: "Shark", french: "Requin"},
    {english: "Dolphin", french: "Dauphin"},
    {english: "Whale", french: "Baleine"},
    {english: "Octopus", french: "Poulpe"},
    {english: "Crab", french: "Crabe"},
    {english: "Lobster", french: "Homard"},
    {english: "Shrimp", french: "Crevette"},
    {english: "Turtle", french: "Tortue"}
]


const insects = [
    {english: "Butterfly", french: "Papillon"},
    {english: "Spider", french: "Araignée"},
    {english: "Bee", french: "Abeille"},
    {english: "Ant", french: "Fourmi"},
    {english: "Mosquito", french: "Moustique"},
    {english: "Fly", french: "Mouche"},
    {english: "Caterpillar", french: "Chenille"},
    {english: "Dragonfly", french: "Libellule"},
    // {english: "Ladybug", french: "Coccinelle"},
    // {english: "Beetle", french: "Scarabée"},
    // {english: "Grasshopper", french: "Sauterelle"},
    // {english: "Cricket", french: "Criquet"},
    // {english: "Cockroach", french: "Cafard"},
    // {english: "Scorpion", french: "Scorpion"},
];
const choices = [animals, aquaticAnimals, insects];

const categoryNames = ['Animals', 'Aquatic Animals', 'Insects'];



//display categories
const categorySelect = document.getElementById('category');
categoryNames.forEach((name, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = name;
    categorySelect.appendChild(option);
  });

//boutton déroulant créer une catégorie
const createCategoryButton = document.getElementById('createCategoryButton');
const createCategorySection = document.querySelector('.new_cat');

createCategoryButton.addEventListener('click', () => {
  createCategorySection.style.display = createCategorySection.style.display === 'none' ? 'block' : 'none';
});

//const words = animals;

let gameBoard = document.getElementById('game-board');
let cards = [];
let flippedCards = [];
let score = 0;
let numberOfMoves=0;
var wordsFound = [];


const newWordsBody = document.getElementById('newWordsBody');

//localStorage.clear();

// Shuffle the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the game
function initGame() {
    
    const selectedCategoryIndex = document.getElementById('category').value;
    words = choices[selectedCategoryIndex];
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
    loadScoreboardData();
    initCategories();

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
            const scoreJoueur = Math.round(1/(numberOfMoves-score)*100);
            addPlayerScore(scoreJoueur); // Call main function with the player's score
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
    const wordsFoundTableBody = document.querySelector('#wordsFound tbody');
    wordsFoundTableBody.innerHTML = "";

}

//afficher les scores
document.addEventListener('DOMContentLoaded', function () {
    loadScoreboardData();
});



function goToHomeScreen() {
    window.location.href = "../homepage.html";
}

function createCategory() {
    window.location.href = "../categories.html";
}

const newCategory = [];

function addWord(){
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" class="newEnglishWord" required></td>
        <td><input type="text" class="newFrenchWord" required></td>
    `;
    newWordsBody.appendChild(newRow);
}

function createCategory(){
    const categoryName = document.getElementById('categoryName').value;
    const newWords = [];
    const newEnglishWords = document.getElementsByClassName('newEnglishWord');
    const newFrenchWords = document.getElementsByClassName('newFrenchWord');


    //vérifier si les champs ne sont pas vides
    for (let i = 0; i < newEnglishWords.length; i++) {
        if (newEnglishWords[i].value === '' || newFrenchWords[i].value === '') {
            alert('All fields are required');
            return;
        }
    }

    for (let i = 0; i < newEnglishWords.length; i++) {
        const englishWord = newEnglishWords[i].value;
        const frenchWord = newFrenchWords[i].value;
        newWords.push({ english: englishWord, french: frenchWord });
    }

    // Add the new category to the choices array
    choices.push(newWords);
    // Add the new category name to the categoryNames array
    categoryNames.push(categoryName);

    // Add the new category to the category select
    const categorySelect = document.getElementById('category');
    const newOption = document.createElement('option');
    newOption.value = choices.length - 1;
    newOption.textContent = categoryName;
    categorySelect.appendChild(newOption);

    // Reset the form
    document.getElementById('newCategoryForm').reset();
    const newWordsBody = document.getElementById('newWordsBody');
    newWordsBody.innerHTML = `
        <tr>
            <td><input type="text" class="newEnglishWord" required></td>
            <td><input type="text" class="newFrenchWord" required></td>
        </tr>
    `;

    // Hide the new category form
    createCategorySection.style.display = 'none';
}




// Start the game
initGame();
