function convertToJSON(response) {
    return response.json();
}


document.getElementById('nav-search-button').addEventListener('click', function () {
    window.location.href = "./search.html";

});

document.getElementById('main-title').addEventListener('click', function () {
    window.location.href = './index.html';
})

document.getElementById('nav-return-home-button').addEventListener('click', function () {
    window.location.href = './index.html';
})

