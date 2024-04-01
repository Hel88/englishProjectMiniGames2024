//let category = "animals";
let memoryScores = [];

function displaymemoryScores(scores, elementId) {
    const scoreboardBody = document.getElementById(elementId);

    // Clear the table body
    scoreboardBody.innerHTML = '';

    // Get the top 5 scores
    const topScores = scores.slice(0, 5);

    // Loop through the top scores and populate the table
    topScores.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        scoreboardBody.appendChild(row);
    });
}



// function resetScoreboard() {
//     // Réinitialiser le tableau des scores
//     memoryScores = [];
//     // Supprimer les données du localStorage
//     localStorage.removeItem('memoryScores');
//     // Mettre à jour l'affichage du scoreboard
//     displaymemoryScores(memoryScores, "scoreboardBody");
//   }
  

// Function to add a player score to the scoreboard and save it to localStorage
function addPlayerScore(score) {
    let savedScores = localStorage.getItem('memoryScores');
    memoryScores = savedScores ? JSON.parse(savedScores) : [];

    if (memoryScores.length < 5 || score > (memoryScores[4]?.score || 0)) {
        const playerName = prompt("Congratulations! You've made it to the top 5! Please enter your name:");
        if (playerName) {
            // Add the player's score to the scoreboard
            memoryScores.push({ name: playerName, score: score });
            // Sort the scoreboard by score in descending order
            memoryScores.sort((a, b) => b.score - a.score);
            // Keep only the top 5 scores
            memoryScores = memoryScores.slice(0, 5);
            // Update the scoreboard display
            displaymemoryScores(memoryScores, "scoreboardBody");

            // Save scoreboard data to localStorage
            localStorage.setItem('memoryScores', JSON.stringify(memoryScores));
        }
    } else {
        alert("Your score doesn't qualify to be in the top 5. Keep practicing!");
    }
}

// Function to load scoreboard data from localStorage
function loadScoreboardData() {
    const savedScores = localStorage.getItem('memoryScores');
    if (savedScores) {
        memoryScores = JSON.parse(savedScores);
        displaymemoryScores(memoryScores, "scoreboardBody");
    } else {
        memoryScores = [];
        displaymemoryScores(memoryScores, "scoreboardBody");
    }
}

