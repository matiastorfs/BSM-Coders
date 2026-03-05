const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "./homepage-logged-out.html";
});

fetch("forumlijst.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("forumlijst");

    data.forum.forEach(item => {
      const forumItem = document.createElement("div");
      forumItem.classList.add("forum-item");

      forumItem.innerHTML = 
        `<h3>${item.titel}</h3>
        <p>${item.beschrijving}</p>
        <p id="messages">${item.berichten} Berichten</p>
        <p id="lastmessage">${item.laatste_bericht_dagen_geleden} dagen geleden - Laatste Bericht</p>`;

      container.appendChild(forumItem);
    });
  });