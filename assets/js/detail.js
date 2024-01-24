function loadDetail() {
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params = new URLSearchParams(url_obj.search)

    if (!params.has('id')) {
        window.location.href = "/";
    }
    fetch(`https://api.coingecko.com/api/v3/coins/ ${params.get('id')} ? localization = false & tickers= false & market_data=true & community_data=false & developer_data=false & sparkline=false`)
        .then(convertToJSON)
        .then(render);
}

function render(data) {
    const name = `${data.name}(${data.symbol})`;
    const description = data.description.en;
    const usd = data.market_data.current_price.usd;
    const eur = data.market_data.current_price.eur;
    const logo = data.image.large;

    document.getElementById('coin-name').innerHTML = name;
    document.getElementById('coin-description').innerHTML = description;

}

window.onload = function () {
    loadDetail();
}