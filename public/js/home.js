const friendUi = document.querySelector(".addFriendUi");
const addFriendBtn = document.querySelector(".addFriend");
const closeFriendBtn = document.querySelector(".closeFriendUi");

if (addFriendBtn && friendUi) {
  addFriendBtn.addEventListener("click", () => {
    friendUi.classList.toggle("visible");
  });
}

if (closeFriendBtn && friendUi) {
  closeFriendBtn.addEventListener("click", () => {
    friendUi.classList.toggle("visible");
  });
}
