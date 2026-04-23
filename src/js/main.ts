document.querySelectorAll(".toggle-menu").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.toggle("open");
  });
});

document.getElementById("btn-account").addEventListener("click", () => {
  window.location.href = "./account.html";
});

const darkToggle = document.querySelector(".switch input") as HTMLInputElement | null;

if (darkToggle && localStorage.getItem("theme") === "dark") {
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