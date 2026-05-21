const messageEl = document.getElementById('flash-message');

if (messageEl) {
  setTimeout(() => {
    messageEl.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    messageEl.style.opacity = "0";
    messageEl.style.transform = "translateY(-20px)"; // Als je hem naar boven wilt laten gaan
    
    setTimeout(() => {
      messageEl.remove();
    }, 500);
  }, 3000); // 3 seconden in beeld
}

const navMenu = document.querySelector(".nav-menu");

document.querySelectorAll(".toggle-menu").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("open");
  });
});

window.addEventListener("click", () => {
  if (navMenu && navMenu.classList.contains("open")) {
    navMenu.classList.remove("open");
  }
});

const accountBtn = document.getElementById("btn-account");
const accountDropdown = document.getElementById("account-dropdown");

if (accountBtn && accountDropdown) {
  accountBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    accountDropdown.classList.toggle("show");
  });
}

window.addEventListener("click", () => {
  if (accountDropdown && accountDropdown.classList.contains("show")) {
    accountDropdown.classList.remove("show");
  }
});

const darkToggle = document.querySelector(".switch input");

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkToggle.checked = true;
}

if (darkToggle !== null) {
  darkToggle.addEventListener("change", () => {
    if (darkToggle.checked) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  });
}

window.addEventListener("storage", () => {
  window.location.reload();
});

// const menu = document.querySelector(".nav-menu");
// const backdrop = document.querySelector(".backdrop");

// document.querySelector("#btn-menu").addEventListener("click", () => {
//   menu.classList.add("open");
//   document.body.classList.add("menu-open");
// });

// document.querySelector("#btn-exit").addEventListener("click", () => {
//   menu.classList.remove("open");
//   document.body.classList.remove("menu-open");
// });

// backdrop.addEventListener("click", () => {
//   menu.classList.remove("open");
//   document.body.classList.remove("menu-open");
// });
