// Fetch data from games.json
const response = await fetch("../games.json");
const games = await response.json();
displayItems(games);

// Displays all the items inside the parameter as a li-element
function displayItems(games) {
  const ul = document.getElementById("game-list");
  ul.innerHTML = "";

  games.forEach(game => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="../game-info.html" id="game-item${game.id}" class="game-items">
      <img src="${game.cover}" alt="${game.title}" width="150" height="150"><br>
      <em>${game.title}</em>
      <p>Releasedatum: ${game.releaseDate}</p>
      </a>
    `;

    ul.appendChild(li);
  });
}

// It filters every game inside of the list when pressing the glass icon,
// only keeping the ones that match the input with part of the title
document.getElementById("search-button").addEventListener("click", function(e) {
  e.preventDefault();

  const searchValue = document
    .getElementById("search-game")
    .value
    .toLowerCase();

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchValue)
  );

  displayItems(filteredGames);
});

// ...
document.getElementById("layout-button").addEventListener("click", function(e) {
  e.preventDefault();

  const listGames = document.getElementById("game-list");
  const items = listGames.querySelectorAll("li");

  items.forEach(item => {
    if (item.style.width === "150px") {
      item.style.width = "300px";
      item.style.border = "1px solid grey";
    } else {
      item.style.width = "150px";
      item.style.border = "none";
    }
  });
});

// Shows more information about a game when clicking on it
const items = document.querySelectorAll(".game-items");

items.forEach(item => {
  item.addEventListener("click", function() {
    const idNumber = item.id.replace("game-item", "");
    localStorage.setItem("selectedGameId", idNumber);
  });
});