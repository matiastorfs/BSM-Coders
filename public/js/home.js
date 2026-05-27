
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
