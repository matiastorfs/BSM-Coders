const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "/";
});

const password = document.getElementById("password");
const confirm = document.getElementById("password2");

function validatePassword() {
    if (password.value !== confirm.value) {
        confirm.setCustomValidity("Wachtwoorden komen niet overeen");
    } else {
        confirm.setCustomValidity(""); // Dit maakt het veld weer 'valid'
    }
}

password.onchange = validatePassword;
confirm.onkeyup = validatePassword;
