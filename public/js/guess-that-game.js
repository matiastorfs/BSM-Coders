async function loadRanking() {
  try {
    const response = await fetch("/api/leaderboard");
    const data = await response.json();

    const rankingSection = document.getElementById("rankingList");

    rankingSection.innerHTML = "";

    const topPlayers = data.topPlayers;
    const myPlayer = data.currentUser;

    function createRankingItem(player, rank) {
      const article = document.createElement("article");
      article.classList.add("rankingItem");

      if (rank === 1) article.classList.add("gold");
      if (rank === 2) article.classList.add("silver");
      if (rank === 3) article.classList.add("bronze");

      const medals = [
        "/assets/1st-place-medal.png",
        "/assets/2nd-place-medal.png",
        "/assets/3rd-place-medal.png",
      ];

      const rankDisplay =
        rank <= 3
          ? `<img src="${medals[rank - 1]}" alt="${rank} place medal" class="medalIcon">`
          : rank;

      article.innerHTML = `
        <div class="rankNumber">${rankDisplay}</div>

        <div class="rankingContent">
          <div class="rankingTop">
            <em class="playerName">${player.name}</em>
            <div class="playerXp">${player.data?.xp || 0} XP</div>
          </div>

          <div class="playerDescription">
            Gamer
          </div>
        </div>
      `;

      return article;
    }

    topPlayers.forEach((player, index) => {
      const rank = index + 1;
      const article = createRankingItem(player, rank);
      rankingSection.appendChild(article);
    });

    if (myPlayer) {
      const myArticle = createRankingItem(myPlayer, "Jij");
      myArticle.classList.add("myRank");
      rankingSection.appendChild(myArticle);
    }

  } catch (error) {
    console.error("Error bij het laden van de ranks:", error);
  }
}

loadRanking();