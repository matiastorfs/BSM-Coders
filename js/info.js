const selectedId = localStorage.getItem("selectedGameId");

const response = await fetch("../games.json");
const games = await response.json();

const game = games.find(g => g.id == selectedId);

const title = document.getElementById("title");
const main = document.getElementById("item-info");

main.innerHTML = `
  <h2>${game.title}</h2>
  <div>
    <img src="${game.cover}">
    <ul>
      <li><em>Beschrijving</em>: ${game.description}</li>
      <li><em>Ontwikkelaar</em>: ${game.developer}</li>
      <li><em>Uitgever</em>: ${game.publisher}</li>
      <li><em>Platforms</em>: ${game.platforms}</li>
      <li><em>Genre</em>: ${game.genre}</li>
      <li><em>Releasedatum</em>: ${game.releaseDate}</li>
    </ul>
  </div>
  `;

title.innerHTML = `${game.title}`;

const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "./homepage-logged-out.html";
});