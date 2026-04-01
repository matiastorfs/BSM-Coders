document.getElementById("navigation-menu").innerHTML = `
<section class="nav-bar">
  <button type="button" class="toggle-menu" id="btn-menu">
    <img src="./assets/menu.png" />
  </button>

  <button type="button" id="btn-account">
    <img id="idle" src="./assets/account-icon-light.png" />
  </button>
</section>

<section class="nav-menu">
  <button type="button" class="toggle-menu">
    <img src="./assets/close-icon.png" id="btn-exit" />
  </button>

  <a href="./home.html">
    <img src="./assets/home-icon.png" />
    <em>Home</em>
  </a>
  <a href="./guess-that-game-homepagina.html">
    <img src="./assets/guess-icon.png" />
    <em>Raad Het Spel</em>
  </a>
  <a href="./settings.html">
    <img src="./assets/setting-icon.png" />
    <em>Instellingen</em>
  </a>
</section>
`;

document.querySelectorAll(".toggle-menu").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.toggle("open");
  });
});

document.getElementById("btn-account").addEventListener("click", () => {
  window.location.href = "./account.html";
});

const darkToggle = document.querySelector('.switch input');

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.checked = true;
}

darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    document.body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("theme", "light");
  }
});