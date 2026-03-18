const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "./home.html";
});

const tabs = document.querySelectorAll(".tab");

tabs.forEach(tab => {
  const header = tab.querySelector(".tab-header");

  header.addEventListener("click", () => {
    const content = tab.querySelector(".tab-content");

    content.classList.toggle("show");
  });
});
