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
    const response = await fetch("./data/rankingDummies.json");
    const players = await response.json();

    const rankingSection = document.getElementById("rankingList");

    players.sort((a, b) => b.xpOwned - a.xpOwned);

    const myPlayer = players.find(player => player.name === "Ik");

    const myRank = players.findIndex(player => player.name === "Ik") + 1;

    function createRankingItem(player, rank) {
      const article = document.createElement("article");
      article.classList.add("rankingItem");

      if (rank === 1) article.classList.add("gold");
      if (rank === 2) article.classList.add("silver");
      if (rank === 3) article.classList.add("bronze");

      const medals = ["🥇", "🥈", "🥉"];
      const rankDisplay = medals[rank - 1] || rank;

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

      return article;
    }

    const topPlayers = players.slice(0, 3);

    topPlayers.forEach((player, index) => {
      const rank = index + 1;
      const article = createRankingItem(player, rank);
      rankingSection.appendChild(article);
    });

    if (myPlayer) {
      const myArticle = createRankingItem(myPlayer, myRank);
      myArticle.classList.add("myRank");
      rankingSection.appendChild(myArticle);
    }

  } catch (error) {
    console.error("Error bij het laden van de ranks:", error);
  }
}

loadRanking();