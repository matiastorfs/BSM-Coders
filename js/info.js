const selectedId = localStorage.getItem("selectedGameId");

const response = await fetch("./games.json");
const games = await response.json();

let favoriteGames = JSON.parse(localStorage.getItem("favoriteGames")) || [];
getInfo();

function getInfo() {
  const game = games.find(g => g.id == selectedId);

  const title = document.getElementById("title");
  const main = document.getElementById("item-info");

  main.innerHTML = `
    <h2>${game.title}</h2>
    <article class="info">
      <section class="info-cover">
        <img src="${game.cover}">
        <button type="button" id="btn-favorite">Favoriet</button>
      </section>
      <section class="info-list">
        <ul>
          <li><em>Beschrijving</em>${game.description}</li>
          <li><em>Ontwikkelaar</em>${game.developer}</li>
          <li><em>Uitgever</em>${game.publisher}</li>
          <li><em>Platforms</em>${game.platforms}</li>
          <li><em>Genre</em>${game.genre}</li>
          <li><em>Releasedatum</em>${game.releaseDate}</li>
        </ul>
      </section>
    </article>
    `;

  title.innerHTML = `${game.title}`;

  const btn = document.getElementById("btn-favorite");
      const root = document.documentElement;
    const bgColor = getComputedStyle(root).getPropertyValue("--main-btn-bg-color");
    const hlColor = getComputedStyle(root).getPropertyValue("--main-btn-bg-hl-color");

  if (favoriteGames.some(g => g.id === game.id)) {
    btn.style.backgroundColor = "#E8CE49"; /* Golden Relic */
  }

  btn.addEventListener("click", function () {
    const index = favoriteGames.findIndex(g => g.id === game.id);

    if (index === -1) {
      favoriteGames.push(game);
      btn.style.backgroundColor = "#E8CE49"; /* Golden Relic */

      btn.addEventListener("mouseenter", function() {
        btn.style.backgroundColor = "#E6BC00"; /* Fat Gold */
      });

      btn.addEventListener("mouseleave", function() {
        btn.style.backgroundColor = "#E8CE49"; /* Golden Relic */
      });
    } else {
      favoriteGames.splice(index, 1);
      btn.style.backgroundColor = bgColor;

      btn.addEventListener("mouseenter", function() {
        btn.style.backgroundColor = hlColor;
      });

      btn.addEventListener("mouseleave", function() {
        btn.style.backgroundColor = bgColor;
      });
    }

    localStorage.setItem("favoriteGames", JSON.stringify(favoriteGames));
  });
}


const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "./home.html";
});