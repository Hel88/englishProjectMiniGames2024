//verbes irréguliers
const verbs = [
    { english: "go", pastSimple: "went", pastParticiple: "gone", french: "aller" },
    { english: "begin", pastSimple: "began", pastParticiple: "begun", french: "commencer" },
    { english: "break", pastSimple: "broke", pastParticiple: "broken", french: "casser" },
    { english: "bring", pastSimple: "brought", pastParticiple: "brought", french: "apporter" },
    { english: "build", pastSimple: "built", pastParticiple: "built", french: "construire" },
    { english: "buy", pastSimple: "bought", pastParticiple: "bought", french: "acheter" },
    // { english: "catch", pastSimple: "caught", pastParticiple: "caught", french: "attraper" },

  ];
  
  let score = 0;
  let currentIndex = 0;
  let attempts = 0;
  
  const infinitiveInput = document.getElementById('infinitive');
  const pastSimpleInput = document.getElementById('past-simple');
  const pastParticipleInput = document.getElementById('past-participle');
  const translationInput = document.getElementById('translation');
  const scoreDisplay = document.getElementById('score');
  const submitButton = document.getElementById('submit');
  const resultDisplay = document.getElementById('result');
  //const answersDisplay = document.querySelectorAll('answersDisplay');

  // Initialisation du jeu
  function initGame() {
    score = 0;
    currentIndex = 0;
    attempts = 0;
    //answersDisplay = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    displayVerb();
    loadScoreboardData();
    displayAnswers(verbs);
  }
  
// Affichage d'un nouveau verbe
function displayVerb() {
    const verb = verbs[currentIndex];
  
    // Tableau des champs d'entrée
    const inputFields = [infinitiveInput, pastSimpleInput, pastParticipleInput, translationInput];
    
    // Indice du champ à pré-remplir
    const randomIndex = Math.floor(Math.random() * inputFields.length);
    
    // Pré-remplissage du champ aléatoire avec la valeur correspondante
    inputFields[randomIndex].value = verb[Object.keys(verb)[randomIndex]]; // Le +1 est pour éviter le champ 'english'
  
    // Désactivation du champ pré-rempli
    inputFields[randomIndex].disabled = true;
  
    // Remplissage des autres champs avec des chaînes vides
    inputFields.forEach((field, index) => {
      if (index !== randomIndex) {
        field.value = '';
        field.disabled = false; // Activation des autres champs
      }
    });
  
    resultDisplay.textContent = '';
  }
  
  // Vérification des réponses
  function checkAnswers() {
    const verb = verbs[currentIndex];
    const infinitive = infinitiveInput.value.trim().toLowerCase();
    const pastSimple = pastSimpleInput.value.trim().toLowerCase();
    const pastParticiple = pastParticipleInput.value.trim().toLowerCase();
    const translation = translationInput.value.trim().toLowerCase();
  
    let correct = true;
    if (infinitive !== verb.english || pastSimple !== verb.pastSimple || pastParticiple !== verb.pastParticiple || translation !== verb.french) {
      correct = false;
    }
  
    if (correct) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
      resultDisplay.textContent = "Correct!";
      currentIndex++;
      attempts = 0;
      
      if (currentIndex < verbs.length) {
        displayVerb();
      } else {
        addPlayerScore(score);
      }
    } else {
      attempts++;
      if (attempts === 3) {
        resultDisplay.textContent = ``;
        attempts = 0;
        currentIndex++;
        if (currentIndex < verbs.length) {
          displayVerb();
        } else {
          //alert(`Game Over! Your final score is ${score}`);
          addPlayerScore(score);
        }
      } else {
        resultDisplay.textContent = `Incorrect. You have ${3 - attempts} attempts left.`;
      }
    }
  }

// Fonction pour afficher les réponses des verbes déjà passés
function displayAnswers(passedVerbs, currentIndex) {
    const answersDisplay = document.getElementById('answersDisplay');
    // Vide le contenu précédent du div
    answersDisplay.innerHTML = '';

    // Parcours de tous les verbes passés et ajout de leurs réponses au div
    passedVerbs.forEach((verb, index) => {
        if (index !== currentIndex) { // Exclure le verbe actuel
            const answerParagraph = document.createElement('p');
            answerParagraph.textContent = `${verb.english} - ${verb.pastSimple} - ${verb.pastParticiple} (${verb.french})`;
            answersDisplay.appendChild(answerParagraph);
        }
    });
}


// Affichage d'un nouveau verbe
function displayVerb() {
    const verb = verbs[currentIndex];
  
    // Tableau des champs d'entrée
    const inputFields = [infinitiveInput, pastSimpleInput, pastParticipleInput, translationInput];
    
    // Indice du champ à pré-remplir
    const randomIndex = Math.floor(Math.random() * inputFields.length);
    
    // Pré-remplissage du champ aléatoire avec la valeur correspondante
    inputFields[randomIndex].value = verb[Object.keys(verb)[randomIndex]]; // Le +1 est pour éviter le champ 'english'
  
    // Désactivation du champ pré-rempli
    inputFields[randomIndex].disabled = true;
  
    // Remplissage des autres champs avec des chaînes vides
    inputFields.forEach((field, index) => {
      if (index !== randomIndex) {
        field.value = '';
        field.disabled = false; // Activation des autres champs
      }
    });
  
    resultDisplay.textContent = '';
    
    // Appeler la fonction displayAnswers en passant le tableau des verbes déjà passés et l'index du verbe actuel
displayAnswers(verbs.slice(0, currentIndex), currentIndex);

}

  //afficher les scores
document.addEventListener('DOMContentLoaded', function () {
    loadScoreboardData();
});
  
  // Événements
  submitButton.addEventListener('click', checkAnswers);
  



  function goToHomeScreen() {
    window.location.href = "../homepage.html";
}


  // Démarrage du jeu
  initGame();
  

  