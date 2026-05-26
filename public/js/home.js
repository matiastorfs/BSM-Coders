const sortForm = document.querySelector(".sort-form");

document.querySelector("#btn-sort").addEventListener("click", () => {
  sortForm.classList.toggle("visible");
});

const friendUi = document.querySelector(".addFriendUi");
const addFriendBtn = document.querySelector(".addFriend");
const closeFriendBtn = document.querySelector(".closeFriendUi");

if (addFriendBtn && friendUi) {
  addFriendBtn.addEventListener("click", () => {
    friendUi.style.display =
      friendUi.style.display === "none" ? "flex" : "none";
  });
}

if (closeFriendBtn && friendUi) {
  closeFriendBtn.addEventListener("click", () => {
    friendUi.style.display =
      friendUi.style.display === "none" ? "flex" : "none";
  });
}

const items = document.querySelectorAll("#list-games li");
const button = document.querySelector("#load-more");

let visible = 16;

items.forEach((item, index) => {
  if (index >= visible) {
    item.style.display = "none";
  }
});

button.addEventListener("click", () => {
  const nextVisible = visible + 16;

  items.forEach((item, index) => {
    if (index < nextVisible) {
      item.style.display = "block";
    }
  });

  visible = nextVisible;

  if (visible >= items.length) {
    button.style.display = "none";
  }
});