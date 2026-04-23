const selectedId = localStorage.getItem("selectedGameId");

const response = await fetch("/data/games.json");
const games = await response.json();
const game = games.find((g) => g.id === Number(selectedId));

let favoriteGames = JSON.parse(localStorage.getItem("favoriteGames")) || [];

document.querySelector("#title").textContent = game.title;
document.querySelector("#info-title").textContent = game.title;
document.querySelector("#item-cover").src = game.cover;

document.querySelectorAll(".info-list li").forEach((item) => {
  const key = item.id.replace("item-", "");
  item.insertAdjacentHTML("beforeend", game[key]);
});

const btn = document.querySelector("#btn-favorite");
btn.classList.toggle("favorite", favoriteGames.includes(game.id));

btn.addEventListener("click", (e) => {
  e.preventDefault();
  const isFavorite = favoriteGames.includes(game.id);

  if (!isFavorite) {
    favoriteGames.push(game.id);
  } else {
    favoriteGames = favoriteGames.filter((id) => id !== game.id);
  }

  localStorage.setItem("favoriteGames", JSON.stringify(favoriteGames));
  btn.classList.toggle("favorite", favoriteGames.includes(game.id));
});
