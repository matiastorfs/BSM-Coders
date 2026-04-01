const response = await fetch("./data/games.json");
const games = await response.json();

const difficulty = localStorage.getItem("difficulty");

let blurAmount;
let xpReward;

switch(difficulty){
    case "easy":
        blurAmount = 5;
        xpReward = 5;
        break;

    case "medium":
        blurAmount = 10;
        xpReward = 10;
        break;

    case "hard":
        blurAmount = 20;
        xpReward = 20;
        break;
}

const imgContainer = document.getElementById("imgGame");
const form = document.getElementById("guessForm");
const input = document.getElementById("guessInput");
const title = document.getElementById("title");

const xpDisplay = document.getElementById("xp");
const progressDisplay = document.getElementById("progress");
const result = document.getElementById("result");

let currentGame;
let correctAnswers = 0;
let totalAnswers = 0;
let xp = 0;
let usedIndexes = [];

title.innerHTML=`Moeilijkheidsgraad: ${difficulty}`;

chooseImg();

function chooseImg() {

    if (totalAnswers >= 4) {
        endGame();
        return;
    }

    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * games.length);
    } while (usedIndexes.includes(randomIndex));

    usedIndexes.push(randomIndex);

    currentGame = games[randomIndex];

    imgContainer.innerHTML =
        `<img src="${currentGame.cover}" width="300" height="300" style="filter: blur(${blurAmount}px);">`;
}


form.addEventListener("submit", function (e) {

    e.preventDefault();

    const guess = input.value.trim().toLowerCase().replace(/\s+/g, "-");;
    const correctName = currentGame.title.toLowerCase().replace(/\s+/g, "-");;

    if (guess === correctName) {

        correctAnswers++;
        xp += xpReward;

        xpDisplay.textContent = xp;
        progressDisplay.textContent = correctAnswers;

        result.textContent = `Correct! +${xpReward} XP`;
        result.style.color = "green";

        input.value = "";

        chooseImg();

    } else {
        result.textContent = `Fout! Correcte antwoord: ${correctName}`;
        result.style.color = "red";

        xpDisplay.textContent = xp;
        progressDisplay.textContent = correctAnswers;

        input.value = "";

        chooseImg();
    }
    totalAnswers++;
});


function endGame() {

    form.style.display = "none";
    result.style.color = "green";

    imgContainer.innerHTML = "";

    result.innerHTML =
        `<br/><br/><br/>
         <h3>Gefeliciteerd!</h3>
         <p>Je hebt het spel voltooid.</p>
         <p>Totaal XP verdiend: ${xp}</p>
         <p><a href="./guess-that-game-homepagina.html">➡️Terug naar "Raad het spel"⬅️</a><p/>`;
}