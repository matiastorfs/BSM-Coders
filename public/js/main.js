const messageEl = document.getElementById("flash-message");

//-----------flashmessage -----------
if (messageEl) {
  setTimeout(() => {
    messageEl.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    messageEl.style.opacity = "0";
    messageEl.style.transform = "translateX(-50%) translateY(-20px)";

    setTimeout(() => {
      messageEl.remove();
    }, 500);
  }, 3000); // 3 seconden
}
//------------flashmessage -----------

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
