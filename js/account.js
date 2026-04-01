const arrow = document.getElementById("arrow");

arrow.addEventListener("click", function () {
  window.location.href = "./home.html";
});

const tabProjecten = document.getElementById('tab-projecten');
const tabPrestaties = document.getElementById('tab-prestaties');
const lijst = document.getElementById('data-lijst');

tabProjecten.addEventListener('click', function() {
    laadEenItem('games.json', 'projecten');
});

tabPrestaties.addEventListener('click', function() {
    laadEenItem('prestaties.json', 'prestaties');
});

function laadEenItem(bestandsnaam, type) {
    if (type === 'projecten') {
        tabProjecten.classList.add('active');
        tabPrestaties.classList.remove('active');
    } else {
        tabPrestaties.classList.add('active');
        tabProjecten.classList.remove('active');
    }
    fetch(bestandsnaam)
        .then(response => response.json())
        .then(data => {
            const item = data[0];

            lijst.innerHTML = '';

            const li = document.createElement('li');

            if (type === 'projecten') {
                li.innerHTML = `
                    <div class="game-card">
                        <img src="${item.cover}" style="width:100px;">
                        <div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                    </div>`;
            } else {
                li.innerHTML = `<h3>${item.titel}</h3><p>${item.omschrijving}</p>`;
            }
            
            lijst.appendChild(li);
        });
}
laadEenItem('games.json', 'projecten');