function loadDetail() {
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params = new URLSearchParams(url_obj.search)

    if (!params.has('id')) {
        window.location.href = "/";
    }
    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
        .then(convertToJSON)
        .then(render);
    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}/market_chart?vs_currency=usd&days=30&interval=daily `)
        .then(convertToJSON)
        .then(renderChart);
}
//here it renders the data from the api//
function render(data) {
    const name = `${data.name}(${data.symbol.toUpperCase()})`;
    const description = data.description.en;
    const logo = data.image.large;
    const usd = data.market_data.current_price.usd;
    const eur = data.market_data.current_price.eur;


    document.getElementById('coin-name').innerText = name;
    document.getElementById('coin-description').innerHTML = description;
    document.getElementById('coin-logo').src = logo;

    document.getElementById('usd-price').innerText = usd;
    document.getElementById('eur-price').innerText = eur;


}
//this will let the loadDetail function run when the window is fully loaded//
window.onload = function () {
    loadDetail();
}

// here we load the chart with the correct data in it//
function renderChart(data) {
    const prices = data.prices;
    const timesstamps = [];
    const prices_usd = [];

    for (let i = 0; i < prices.length; i++) {
        const single_price = prices[i];
        const date_obj = new Date(single_price[0]);
        let days = date_obj.getDate();
        timesstamps.push(`${days}`);
        prices_usd.push(single_price[1]);

    }
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: timesstamps,
            datasets: [{
                label: 'Price (in USD)',
                data: prices_usd,
                borderColor: 'rgb(75,192,192',
                tension: 0.4,


            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false,

                }
            }
        }

    });

}