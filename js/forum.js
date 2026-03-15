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
      
    if (item.laatste_bericht_dagen_geleden === 1) {
        forumItem.innerHTML = 
        `<div id="forumItem"><h3>${item.titel}</h3>
        <p>${item.beschrijving}</p>
        <p id="messages">${item.berichten} Berichten</p>
        <p id="lastmessage">${item.laatste_bericht_dagen_geleden} dag geleden - Laatste Bericht</p><div/>`;
    }
    else {
        forumItem.innerHTML = 
        `<div id="forumItem"><h3>${item.titel}</h3>
        <p>${item.beschrijving}</p>
        <p id="messages">${item.berichten} Berichten</p>
        <p id="lastmessage">${item.laatste_bericht_dagen_geleden} dagen geleden - Laatste Bericht</p><div/>`;
    }

      container.appendChild(forumItem);
    });
  });