let games = [];

async function getGames() {
  const response = await fetch("/api/games");
  games = await response.json();
}

getGames();

const sortForm = document.querySelector(".sort-form");
let favoriteGames;
let state = 0;

try {
  favoriteGames = JSON.parse(localStorage.getItem("favoriteGames")) || [];
} catch (err) {
  favoriteGames = [];
  console.log(err);
}

const favoriteGameObjects = favoriteGames
  .map((id) => games.find((g) => g.id === id))
  .filter(Boolean);

function displayItems(items, type = "games") {
  const ul = document.querySelector(`#list-${type}`);
  if (!ul) return;
  ul.innerHTML = "";

  items.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="./info.html" id="game-item${item.id}" class="game-items">
        <img src="${item.thumbnail}" alt="${item.title}">
        <em>${item.title}</em>
        <p>${item.developer}</p>
      </a>
    `;

    ul.appendChild(li);
  });

  ul.addEventListener("click", (e) => {
    const item = e.target.closest(".game-items");
    if (!item) return;

    localStorage.setItem("selectedGameId", item.id.replace("game-item", ""));
  });
}

function sortGames(option, sort) {
  const dir = sort === 1 ? 1 : -1;
  return [...games].sort((a, b) => {
    switch (option) {
      case "name":
        return a.title.localeCompare(b.title) * dir;
      case "developer":
        return a.developer.localeCompare(b.developer) * dir;
      case "date":
        return (new Date(a.release_date) - new Date(b.release_date)) * dir;
    }
  });
}

const friendUi = document.querySelector(".addFriendUi");
const addFriendBtn = document.querySelector(".addFriend");
const closeFriendBtn = document.querySelector(".closeFriendUi");

if (addFriendBtn && friendUi) {
  addFriendBtn.addEventListener("click", () => {
    friendUi.style.display = friendUi.style.display === "none" ? "flex" : "none";
  });
}

if (closeFriendBtn && friendUi) {
  closeFriendBtn.addEventListener("click", () => {
    friendUi.style.display = friendUi.style.display === "none" ? "flex" : "none";
  });
}