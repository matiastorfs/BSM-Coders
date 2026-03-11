const soloPlay = document.getElementById("soloPlay");
soloPlay.addEventListener("click", function () {
  window.location.href = "./guess-that-game-homepagina.html";
});

const oneVOne = document.getElementById("1v1");
oneVOne.addEventListener("click", function () {
  window.location.href = "./guess-that-game-1v1.html";
});



async function loadRanking() {
  try {
    const response = await fetch("./rankingDummies.json");
    const players = await response.json();

    players.sort((a, b) => b.xpOwned - a.xpOwned);

    const topPlayers = players.slice(0, 3);

    const rankingSection = document.getElementById("rankingList");

    topPlayers.forEach((player, index) => {
      const rank = index + 1;

      const article = document.createElement("article");
      article.classList.add("rankingItem");

      if (rank === 1) article.classList.add("gold");
      if (rank === 2) article.classList.add("silver");
      if (rank === 3) article.classList.add("bronze");

      const medals = ["🥇", "🥈", "🥉"];
      const rankDisplay = medals[index] || rank;

      article.innerHTML = `
        <div class="rankNumber">${rankDisplay}</div>
        
        <div class="rankingContent">
          <div class="rankingTop">
            <em class="playerName">${player.name}</em>
            <div class="playerXp">${player.xpOwned} XP</div>
          </div>

          <div class="playerDescription">
            ${player.description}
          </div>
        </div>
      `;

      rankingSection.appendChild(article);
    });

  } catch (error) {
    console.error("Error loading ranking:", error);
  }
}

loadRanking();