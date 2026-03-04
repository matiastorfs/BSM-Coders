const response = await fetch("../games.json");
const games = await response.json();
displayItems(games);

function displayItems(games) {
  const ul = document.getElementById("game-list");
  ul.innerHTML = "";

  games.forEach(game => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="../game-info.html" id="game-item${game.id}" class="game-items">
      <img src="${game.cover}" alt="${game.title}" width="150" height="150"><br>
      <em>${game.title}</em>
      <p>${game.developer}</p>
      </a>
    `;

    ul.appendChild(li);
  });
}

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


document.getElementById("layout-button").addEventListener("click", function(e) {
  e.preventDefault();

  const listGames = document.getElementById("game-list");
  const items = listGames.querySelectorAll("li");

  items.forEach(item => {
    if (item.style.width === "150px") {
      item.style.width = "200px";
    } else {
      item.style.width = "150px";
    }
  });
});

const items = document.querySelectorAll(".game-items");

items.forEach(item => {
  item.addEventListener("click", function() {
    const idNumber = item.id.replace("game-item", "");
    localStorage.setItem("selectedGameId", idNumber);
  });
});