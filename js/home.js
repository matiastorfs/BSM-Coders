// Fetch all game data
const response = await fetch("../games.json");
const games = await response.json();
let favoriteGames;

try {
  favoriteGames = JSON.parse(localStorage.getItem("favoriteGames")) || [];
} catch {
  favoriteGames = [];
}

displayGames(favoriteGames, "favorites");
displayGames(games);

// Displays all the games that are on the given list
function displayGames(games, listType = "games") {
  const ul = document.querySelector(`#list-${listType}`);
  ul.innerHTML = "";

  games.forEach((game) => {
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

  ul.addEventListener("click", (e) => {
    const item = e.target.closest(".game-items");
    const idNumber = item.id.replace("game-item", "");

    localStorage.setItem("selectedGameId", idNumber);
  });
}

// Filter games based on the title and see if it contains the search input
document.getElementById("btn-search").addEventListener("click", function (e) {
  e.preventDefault();

  const searchValue = document.getElementById("txt-search").value.toLowerCase();
  const filteredGames = games.filter((game) =>
    game.title.toLowerCase().includes(searchValue),
  );

  displayGames(filteredGames);
});

// Shows or hides the sort options
document.getElementById("btn-sort").addEventListener("click", function (e) {
  const form = document.querySelector(".sort-buttons");

  if (form.style.display === "") {
    form.style.display = "flex";
    sortButton.state--;
    changeState(sortButton.type);
  } else {
    form.style.display = "";
  }
});

// Sort games by name, developer or date
function sortGames(option, sort) {
  const sortedGames = [...games].sort(function (a, b) {
    const dir = sort === "asc" ? 1 : -1;
    switch (option) {
      case "name":
        return a.title.localeCompare(b.title) * dir;
      case "developer":
        return a.developer.localeCompare(b.developer) * dir;
      case "date":
        return (new Date(a.releaseDate) - new Date(b.releaseDate)) * dir;
    }
  });

  displayGames(sortedGames);
}

let sortNames = {
  name: "Naam",
  developer: "Ontwikkelaar",
  date: "Datum"
};

let sortButton = {
  type: "",
  state: 0,
  arrow: ""
};

document.querySelector(".sort-buttons").addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  changeState(btn.id.replace("sort-", ""));
});

function changeState(type) {
  if (sortButton.type !== type) {
    sortButton.type = type;
    sortButton.state = 0;
  }

  if (sortButton.state === 0) {
    sortButton.arrow = `<img src="./assets/arrow-down.png">`;
    sortButton.state++;
  } else if (sortButton.state === 1) {
    sortButton.arrow = `<img src="./assets/arrow-up.png">`;
    sortButton.state++;
  } else {
    sortButton.arrow = "";
    sortButton.state = 0;
  }

  document.querySelectorAll(".sort-button").forEach(button => {
    const key = button.id.replace("sort-", "");
    button.innerHTML = sortNames[key] + ((sortButton.type === key) ? sortButton.arrow : "");
  });

  if (sortButton.state === 1) {
    sortGames(sortButton.type, "asc");
  } else if (sortButton.state === 2) {
    sortGames(sortButton.type, "desc");
  } else {
    displayGames(games);
  }
}

// Display all of your friends
function displayFriends(totalFriends) {
  const ul = document.querySelector("#list-friends");
  ul.innerHTML = "";

  for (let index = 0; index < totalFriends; index++) {
    const li = document.createElement("li");

    li.innerHTML = `
      <img src="./assets/user-icon.png"><p>Vriend</p>
    `;

    ul.appendChild(li);
  }
}

displayFriends(12);

document.querySelectorAll(".toggle-menu").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.toggle("open");
  });
});

document.getElementById("btn-account").addEventListener("click", () => {
  window.location.href = "./account.html";
});
