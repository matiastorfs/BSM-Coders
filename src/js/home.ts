async function init() {
  const response = await fetch("/data/games.json");
  const games = await response.json();
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

  displayItems(favoriteGameObjects, "favorites");
  displayItems(games);

  function displayItems(items, type = "games") {
    const ul = document.querySelector(`#list-${type}`);
    ul.innerHTML = "";

    items.forEach((item) => {
      const li = document.createElement("li");

      li.innerHTML = `
        <a href="./info.html" id="game-item${item.id}" class="game-items">
          <img src="${item.cover}" alt="${item.title}" width="150" height="150">
          <em>${item.title}</em>
          <p>${item.developer}</p>
        </a>
      `;

      ul.appendChild(li);
    });

    ul.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const item = target.closest(".game-items");
      // const item = e.target.closest(".game-items");
      if (!item) return;

      localStorage.setItem("selectedGameId", item.id.replace("game-item", ""));
    });
  }

  document.querySelector("#btn-search").addEventListener("click", (e) => {
    e.preventDefault();

    const input = document.querySelector("#txt-search") as HTMLInputElement;
    const searchValue = input.value.toLowerCase();
    // const searchValue = document.querySelector("#txt-search").value.toLowerCase();
    const filteredGames = games.filter((game) =>
      game.title.toLowerCase().includes(searchValue),
    );

    displayItems(filteredGames);
  });

  function sortGames(option, sort) {
    const dir = sort === 1 ? 1 : -1;
    return [...games].sort((a, b) => {
      switch (option) {
        case "name":
          return a.title.localeCompare(b.title) * dir;
        case "developer":
          return a.developer.localeCompare(b.developer) * dir;
        case "date":
          return (new Date(a.releaseDate as string).getTime() -
            new Date(b.releaseDate as string).getTime()) * dir;
          // return (new Date(a.releaseDate) - new Date(b.releaseDate)) * dir;
      }
    });
  }

  document.querySelector("#btn-sort").addEventListener("click", (e) => {
    e.preventDefault();
    sortForm.classList.toggle("visible");
  });

  sortForm.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      state = btn.querySelector("img") ? (state + 1) % 3 : 1;
      sortForm.querySelectorAll("button img").forEach((img) => img.remove());

      if (state === 0) {
        displayItems(games);
      } else {
        const img = `<img src="./assets/arrow-${state === 1 ? "down" : "up"}.png">`;
        const sortedGames = sortGames(btn.id.replace("sort-", ""), state);

        btn.insertAdjacentHTML("beforeend", img);
        displayItems(sortedGames);
      }
    });
  });

}

init();