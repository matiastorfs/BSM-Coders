let gameList = [];

// Get data from games.json
const response = await fetch("../games.json");
const games = await response.json();
gameList = games;
displayGames(gameList);

// Displays all the items as a li-element inside of the given array
function displayGames(games) {
  const ul = document.getElementById("game-list");
  ul.innerHTML = ""; 

  games.forEach(game => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="../game-info.html" id="game-item${game.id}" class="game-items">
      <img src="${game.image}" alt="${game.title}" width="150" height="150"><br>
      <em>${game.title}</em>
      <p>Laatst geupdate: ${game.lastUpdated}</p>
      </a>
    `;

    ul.appendChild(li);
  });
}

// Only runs when pressing the glass icon to search for games
// Filters every game inside of the list, only keeping the ones that contain the input given
document.getElementById("search-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const searchValue = document
    .getElementById("search-game")
    .value
    .toLowerCase();

  const filteredGames = gameList.filter(game =>
    game.title.toLowerCase().includes(searchValue)
  );

  displayGames(filteredGames);
});


// Show more information about a game when clicking on it
const items = document.querySelectorAll(".game-items");

items.forEach(item => {
  item.addEventListener("click", function() {
    const idNumber = item.id.replace("game-item", "");
    localStorage.setItem('selectedGameId', idNumber);
  });
});