let category = "fruits";

function displaySpellingBeeScores(scores, elementId) {
    const scoreboardBody = document.getElementById(elementId);

    // Clear the table body
    scoreboardBody.innerHTML = '';

    
    // Loop through the scores and populate the table
    scores.forEach((entry, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${entry.name}</td>
            <td>${entry.score}</td>
        `;
        scoreboardBody.appendChild(row);
    });
}


// Function to add a player score to the scoreboard and save it to localStorage
function addPlayerScore(score) {
    // Add player score to the scoreboard
    if (spellingBeeScores.length < 20 || score > spellingBeeScores[19].score) {
        const playerName = prompt("Congratulations! You've made it to the top 20! Please enter your name:");
        if (playerName) {
            // Add the player's score to the scoreboard
            spellingBeeScores.push({ name: playerName, score: score });
            // Sort the scoreboard by score in descending order
            spellingBeeScores.sort((a, b) => b.score - a.score);
            // Keep only the top 20 scores
            spellingBeeScores = spellingBeeScores.slice(0, 20);
            // Update the scoreboard display
            displaySpellingBeeScores(spellingBeeScores, "scoreboardBody");
            
            // Save scoreboard data to localStorage
            localStorage.setItem('spellingBeeScores'+category, JSON.stringify(spellingBeeScores));
        }
    } else {
        alert("Your score doesn't qualify to be in the top 20. Keep practicing!");
    }
}

// Function to load scoreboard data from localStorage
function loadScoreboardData(nCategory) {
    category = nCategory;
    const savedScores = localStorage.getItem('spellingBeeScores'+category);
    if (savedScores) {
        spellingBeeScores = JSON.parse(savedScores);
        displaySpellingBeeScores(spellingBeeScores, "scoreboardBody");
    }else{
        spellingBeeScores = [];
        displaySpellingBeeScores(spellingBeeScores, "scoreboardBody");
    }
}
