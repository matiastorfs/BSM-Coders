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
      <li><em>Description</em>: ${game.description}</li>
      <li><em>Developer</em>: ${game.developer}</li>
      <li><em>Publisher</em>: ${game.publisher}</li>
      <li><em>Platforms</em>: ${game.platforms}</li>
      <li><em>Genre</em>: ${game.genre}</li>
      <li><em>Release date</em>: ${game.releaseDate}</li>
    </ul>
  </div>
  `;

title.innerHTML = `${game.title}`;