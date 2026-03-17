// Fetch all game data
const response = await fetch("../games.json");
const games = await response.json();
let favoriteGames;

try {
  favoriteGames = JSON.parse(localStorage.getItem("favoriteGames")) || [];
} catch {
  favoriteGames = [];
}

displayFavorites(favoriteGames);
displayGames(games);

// Displays all games inside of the given list
function displayGames(games) {
  const ul = document.getElementById("list-search");
  ul.innerHTML = "";

  games.forEach(game => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="../info.html" id="game-item${game.id}" class="game-items">
        <img src="${game.cover}" alt="${game.title}" width="150" height="150">
        <em>${game.title}</em>
        <p>${game.developer}</p>
      </a>
    `;

    ul.appendChild(li);
  });

  saveGameId();
}

function displayFavorites(games) {
  const ul = document.getElementById("list-favorites");
  ul.innerHTML = "";

  games.forEach(game => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="../info.html" id="game-item${game.id}" class="game-items">
        <img src="${game.cover}" alt="${game.title}" width="150" height="150">
        <em>${game.title}</em>
        <p>${game.developer}</p>
      </a>
    `;

    ul.appendChild(li);
  });

  saveGameId();
}

// Saves the game you clicked on so it can be used on the info page
function saveGameId() {
  const items = document.querySelectorAll(".game-items");

  items.forEach(item => {
    item.addEventListener("click", function() {
      const idNumber = item.id.replace("game-item", "");
      localStorage.setItem("selectedGameId", idNumber);
    });
  });
}

// Filter games based on the title and see if it contains the search input
document.getElementById("btn-search").addEventListener("click", function(e) {
  e.preventDefault();

  const searchValue = document.getElementById("txt-search").value.toLowerCase();
  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchValue)
  );

  displayGames(filteredGames);
});

// Shows or hides the sort options
document.getElementById("btn-sort").addEventListener("click", function(e) {
  const form = document.querySelector(".sort-options");
  
  if (form.style.display === "") {
    form.style.display = "none";
  }

  if (form.style.display === "none") {
    form.style.display = "flex";
    sortState--;
    changeState(sortName);

  } else {
    form.style.display = "none";
    form.innerHTML = "";
  }
});

// Sort games by name, developer or date
function sortGames(option, sort) {
  const sortedGames = [...games].sort(function(a, b) {
    if (sort === "asc") {
      switch (option) {
        case "name":
          return a.title.localeCompare(b.title);
        case "developer":
          return a.developer.localeCompare(b.developer);
        case "date":
          return new Date(a.releaseDate) - new Date(b.releaseDate);
      }
    } else if (sort === "desc") {
      switch (option) {
        case "name":
          return b.title.localeCompare(a.title);
        case "developer":
          return b.developer.localeCompare(a.developer);
        case "date":
          return new Date(b.releaseDate) - new Date(a.releaseDate);
      }
    }
  });

  displayGames(sortedGames);
}

let sortName = "";
let sortState = 0;
let sortHTML = "";

function changeState(type) {
  const form = document.querySelector(".sort-options");

  form.innerHTML = `
    <button type="button" id="sort-name">Naam</button>
    <button type="button" id="sort-developer">Ontwikkelaar</button>
    <button type="button" id="sort-date">Datum</button>
  `;
  
  document.getElementById("sort-name").addEventListener("click", () => changeState("name"));
  document.getElementById("sort-developer").addEventListener("click", () => changeState("developer"));
  document.getElementById("sort-date").addEventListener("click", () => changeState("date"));

  if (sortName !== type) {
    sortName = type;
    sortState = 0;
  }

  if (sortState === 0) {
    sortHTML = `<img src="./assets/arrow-down.png">`;
    sortState++;
  } else if (sortState === 1) {
    sortHTML = `<img src="./assets/arrow-up.png">`;
    sortState++;
  } else {
    sortHTML = "";
    sortState = 0;
  }

  const sortButton = document.getElementById(`sort-${sortName}`);

  switch (sortName) {
    case "name":
      sortButton.innerHTML = "Naam" + sortHTML;
      break;
    case "developer":
      sortButton.innerHTML = "Ontwikkelaar" + sortHTML;
      break;
    case "date":
      sortButton.innerHTML = "Datum" + sortHTML;
      break;
  }

  if (sortState === 1) {
    sortGames(sortName, "asc");
  } else if (sortState === 2) {
    sortGames(sortName, "desc");
  } else {
    displayGames(games);
  }
}

// Display all of your friends
function displayFriends(totalFriends) {
  const ul = document.getElementById("list-friends");
  ul.innerHTML = "";

  for (let index = 0; index < totalFriends; index++) {
    const li = document.createElement("li");
    
    li.innerHTML = `
      <li><img src="./assets/user-icon.png"><p>Vriend</p></li>
    `;

    ul.appendChild(li);
  }
}

displayFriends(12);


document.getElementById("btn-menu").addEventListener("click", function(e) {
  e.preventDefault();

  const menu = document.querySelector(".menu");

  menu.style.display = "flex";

  menu.innerHTML = `
    <button type="button" id="exit-menu"><img src="./assets/x-icon.png"></button>
    <a href="./home.html"><em>Home</em></a>
    <a href="./guess-that-game/guess-that-game-homepagina.html"><em>Raad Dat Spel</em></a>
    <a><em>Instellingen</em></a>
  `;

  document.getElementById("exit-menu").addEventListener("click", function() {
    menu.innerHTML = "";
    menu.style.display = "none";
  });
});