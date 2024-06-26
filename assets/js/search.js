function searchData() {
    const currentURL = window.location.href;
    const url_obj = new URL(currentURL);
    const params = new URLSearchParams(url_obj.search);
    if (!params.has('q')) {
        return;
    }

    document.getElementById('search_coin').value = params.get('q');

    fetch('https://api.coingecko.com/api/v3/search?query=' + params.get('q'))
        .then(convertToJSON)
        .then(render);

}


//here it renders the data from the api//
function render(data) {

    for (let i = 0; i < data.coins.length; i++) {
        const singleCoin = data.coins[i];
        const index = i + 1;
        const logo = singleCoin.thumb;
        const name = singleCoin.name;
        const symbol = singleCoin.symbol;
        const coinId = singleCoin.id;
        createSingleCard(index, logo, name, symbol, coinId);

    }
}
// here it loads all the data and inserts it into the divs etc//
function createSingleCard(index, logo, name, symbol, coinId) {

    const id_elem = document.createElement('p');
    id_elem.innerHTML = index;

    const logo_elem = document.createElement('img');
    logo_elem.src = logo;
    logo_elem.alt = "Coin logo ";

    const name_elem = document.createElement('h3');
    name_elem.innerText = name;

    const symbol_elem = document.createElement('h3');
    symbol_elem.innerText = symbol;

    const anchor_elem = document.createElement('a');
    anchor_elem.innerText = "More Info";
    anchor_elem.href = "./detail.html?id=" + coinId;

    const container_elem = document.createElement('div');
    container_elem.classList.add('single-search-result', 'card')
    container_elem.addEventListener('click', function () {
        window.location.href = "./detail.html?id=" + coinId;
    })

    container_elem.appendChild(id_elem)
    container_elem.appendChild(logo_elem)
    container_elem.appendChild(name_elem)
    container_elem.appendChild(symbol_elem)
    container_elem.appendChild(anchor_elem)

    document.getElementById('search-results').appendChild(container_elem);
}


//this will let the searchData function run when the window is fully loaded//s
window.onload = function () {
    searchData();
}