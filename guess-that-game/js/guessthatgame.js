const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "../homepage-logged-out.html";
});

const soloPlay = document.getElementById("soloPlay");

soloPlay.addEventListener("click", function () {
  window.location.href = "./guess-that-game-homepagina.html";
});

const oneVOne = document.getElementById("1v1");

oneVOne.addEventListener("click", function () {
  window.location.href = "./guess-that-game-1v1.html";
});