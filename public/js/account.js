const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "/home";
});

const tabProjecten = document.getElementById("tab-projecten");
const tabPrestaties = document.getElementById("tab-prestaties");
const lijst = document.getElementById("data-lijst");

tabProjecten.addEventListener("click", function () {
  laadEenItem("./data/games.json", "projecten");
});

tabPrestaties.addEventListener("click", function () {
  laadEenItem("./data/prestaties.json", "prestaties");
});

function laadEenItem(bestandsnaam, type) {
  if (type === "projecten") {
    tabProjecten.classList.add("active");
    tabPrestaties.classList.remove("active");
  } else {
    tabPrestaties.classList.add("active");
    tabProjecten.classList.remove("active");
  }
  fetch(bestandsnaam)
    .then((response) => response.json())
    .then((data) => {
      const item = data[0];

      lijst.innerHTML = "";

      const li = document.createElement("li");

      if (type === "projecten") {
        li.innerHTML = `
                    <div class="game-card">
                        <img src="${item.cover}" style="width:100px;">
                        <div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>`;
      } else {
        li.innerHTML = `<h3>${item.titel}</h3><p>${item.omschrijving}</p>`;
      }

      lijst.appendChild(li);
    });
}
laadEenItem("./data/games.json", "projecten");

    const profileImageContainer = document.querySelector(".profile-image-container");
    const changeLogoMenu = document.querySelector(".changelogo");
    const closeButton = document.querySelector(".close-button");

    profileImageContainer.addEventListener("click", () => {
            changeLogoMenu.classList.add("show");
        });

    closeButton.addEventListener("click", () => {
            changeLogoMenu.classList.remove("show");
        });


        const profileForm = document.getElementById("profile-form");
        const iconInput = document.getElementById("selected-icon-input");
        const profilePics = document.querySelectorAll(".profilepictures");

profilePics.forEach(pic => {
            pic.addEventListener("click", () => {
                const chosenIcon = pic.getAttribute("data-icon");
                iconInput.value = chosenIcon;
                profileForm.submit();
            });
        });