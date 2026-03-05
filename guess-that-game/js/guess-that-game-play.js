const response = await fetch("../games.json");
const games = await response.json();
chooseImg();

function chooseImg(){
    const randomNumber = Math.floor(Math.random() * games.length);
    
    const img = document.getElementById("imgGame");
    img.innerHTML = `<img src="${games[randomNumber].cover}" width="300" height="300">`;
}
