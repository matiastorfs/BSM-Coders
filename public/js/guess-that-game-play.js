const difficulty = localStorage.getItem("difficulty");

let blurAmount;
let xpReward;
let optionCount;

switch (difficulty) {
  case "easy":
    blurAmount = 5;
    xpReward = 5;
    optionCount = 3;
    break;

  case "medium":
    blurAmount = 10;
    xpReward = 10;
    optionCount = 5;
    break;

  case "hard":
    blurAmount = 20;
    xpReward = 20;
    optionCount = 8;
    break;
}

const imgContainer = document.getElementById("imgGame");
const form = document.getElementById("guessForm");
const select = document.getElementById("guessSelect");
const title = document.getElementById("title");

const xpDisplay = document.getElementById("xp");
const progressDisplay = document.getElementById("progress");
const result = document.getElementById("result");

let currentGame;
let correctAnswers = 0;
let totalAnswers = 0;
let xp = 0;
let usedIndexes = [];
let games = [];

title.innerHTML = `Moeilijkheidsgraad: ${difficulty}`;

async function main() {
  const res = await fetch("/api/games");
  games = await res.json();
  console.log("Fetching games...")

  chooseImg(games);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const guess = select.value;
    const correctName = currentGame.title

    if (guess === correctName) {
      correctAnswers++;
      xp += xpReward;

      xpDisplay.textContent = xp;
      progressDisplay.textContent = correctAnswers;

      result.textContent = `Correct! +${xpReward} XP`;
      result.style.color = "green";

      select.value = "";

      chooseImg(games);
    } else {
      result.textContent = `Fout! Correcte antwoord: ${correctName}`;
      result.style.color = "red";

      xpDisplay.textContent = xp;
      progressDisplay.textContent = correctAnswers;

      select.value = "";

      chooseImg(games);
    }
    totalAnswers++;
  });
}

function chooseImg(games) {
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

  imgContainer.innerHTML = `<img src="${currentGame.thumbnail}" width="300" height="300" style="filter: blur(${blurAmount}px);">`;
  generateOptions();
}

function generateOptions() {
  select.innerHTML = `<option value="">-- Kies een spel --</option>`;

  const options = [];
  options.push(currentGame);

  while (options.length < optionCount) {
    const randomGame = games[Math.floor(Math.random() * games.length)];

    if (!options.find(g => g.id === randomGame.id)) {
      options.push(randomGame);
    }
  }

  options.sort(() => Math.random() - 0.5);

  options.forEach(game => {
    const option = document.createElement("option");
    option.value = game.title
    option.textContent = game.title;
    select.appendChild(option);
  });
}

async function endGame() {
  form.style.display = "none";
  result.style.color = "green";

  imgContainer.innerHTML = "";

  try {
    await fetch("/api/add-xp", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        xp: xp
      })
    });
  } catch (error) {
    console.error("Was niet in staat om het xp op te slaan:", error);
  }

  try {
    await fetch("/api/add-played-game", {
      method: "POST"
    });
  } catch (error) {
    console.error("Kon gamesPlayed niet opslaan:", error);
  }

  result.innerHTML = `<br/><br/><br/>
         <h3>Gefeliciteerd!</h3>
         <p>Je hebt het spel voltooid.</p>
         <p>Totaal XP verdiend: ${xp}</p>
         <p><a href="/guess-that-game">➡️Terug naar "Raad het spel"⬅️</a><p/>`;
}

main();