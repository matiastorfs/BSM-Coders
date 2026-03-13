// Fetch all game data
const response = await fetch("../games.json");
const games = await response.json();

displayGames(games);

// Displays all games inside of the given list
function displayGames(games) {
  const ul = document.getElementById("list-games");
  ul.innerHTML = "";

  games.forEach(game => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="../game-info.html" id="game-item${game.id}" class="game-items">
        <img src="${game.cover}" alt="${game.title}" width="150" height="150">
        <em>${game.title}</em>
        <p>${game.developer}</p>
      </a>
    `;

    ul.appendChild(li);
    saveGameId();
  });
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
  } else {
    form.style.display = "none";
  }
});

// Sort games by name, developer or date
function sortGames(option) {
  const sortedGames = [...games].sort(function(a, b) {
    switch (option) {
      case "name":
        return a.title.localeCompare(b.title);
      case "developer":
        return a.developer.localeCompare(b.developer);
      case "date":
        return a.releaseDate.localeCompare(b.releaseDate);
    }
  });

  displayGames(sortedGames);
}

document.getElementById("sort-name").addEventListener("click", () => sortGames("name"));
document.getElementById("sort-developer").addEventListener("click", () => sortGames("developer"));
document.getElementById("sort-date").addEventListener("click", () => sortGames("date"));