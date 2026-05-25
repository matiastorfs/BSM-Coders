const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "/home";
});

const tabProjecten = document.getElementById("tab-projecten");
const tabPrestaties = document.getElementById("tab-prestaties");

const collectiesSection = document.getElementById("collecties-section");
const prestatiesSection = document.getElementById("prestaties-section");
tabProjecten.classList.add("active");

tabProjecten.addEventListener("click", function () {
  tabProjecten.classList.add("active");
  tabPrestaties.classList.remove("active");

  collectiesSection.style.display = "block";
  prestatiesSection.style.display = "none";
});

tabPrestaties.addEventListener("click", function () {
  tabPrestaties.classList.add("active");
  tabProjecten.classList.remove("active");

  collectiesSection.style.display = "none";
  prestatiesSection.style.display = "block";

  laadPrestaties();
});

function laadPrestaties() {
  fetch("./data/prestaties.json")
    .then((response) => response.json())
    .then((data) => {
      prestatiesSection.innerHTML = "";

      data.forEach((item) => {
        const div = document.createElement("div");

        div.classList.add("prestatie-item");

        div.innerHTML = `
          <h3>${item.titel}</h3>
          <p>${item.omschrijving}</p>
        `;

        prestatiesSection.appendChild(div);
      });
    });
}