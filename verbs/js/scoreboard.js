//let category = "animals";
let verbsScores = [];

function displayverbsScores(scores, elementId) {
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
//     verbsScores = [];
//     // Supprimer les données du localStorage
//     localStorage.removeItem('verbsScores');
//     // Mettre à jour l'affichage du scoreboard
//     displayverbsScores(verbsScores, "scoreboardBody");
//   }
  

// Function to add a player score to the scoreboard and save it to localStorage
function addPlayerScore(score) {
    let savedScores = localStorage.getItem('verbsScores');
    verbsScores = savedScores ? JSON.parse(savedScores) : [];

    if (verbsScores.length < 5 || score > (verbsScores[4]?.score || 0)) {
        const playerName = prompt("Congratulations! You've made it to the top 5! Please enter your name:");
        if (playerName) {
            // Add the player's score to the scoreboard
            verbsScores.push({ name: playerName, score: score });
            // Sort the scoreboard by scvore in descending order
            verbsScores.sort((a, b) => b.score - a.score);
            // Keep only the top 5 scores
            verbsScores = verbsScores.slice(0, 5);
            // Update the scoreboard display
            displayverbsScores(verbsScores, "scoreboardBody");

            // Save scoreboard data to localStorage
            localStorage.setItem('verbsScores', JSON.stringify(verbsScores));
        }
    } else {
        alert("Your score doesn't qualify to be in the top 5. Keep practicing!");
    }
}

// Function to load scoreboard data from localStorage
function loadScoreboardData() {
    const savedScores = localStorage.getItem('verbsScores');
    if (savedScores) {
        verbsScores = JSON.parse(savedScores);
        displayverbsScores(verbsScores, "scoreboardBody");
    } else {
        verbsScores = [];
        displayverbsScores(verbsScores, "scoreboardBody");
    }
}

