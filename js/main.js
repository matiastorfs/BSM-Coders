document.querySelectorAll(".toggle-menu").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.toggle("open");
  });
});

document.getElementById("btn-account").addEventListener("click", () => {
  window.location.href = "./account.html";
});