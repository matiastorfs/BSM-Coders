const selectedId = localStorage.getItem("selectedGameId");

const response = await fetch("../games.json");
const games = await response.json();

const game = games.find(g => g.id == selectedId);

const title = document.getElementById("title");
const main = document.getElementById("item-info");

main.innerHTML = `
                <h2>${game.title}</h2>
                <img src="${game.image}">`;
// <p><em>Last updated</em>: ${game.lastUpdated}</p>
title.innerHTML = `${game.title}`;