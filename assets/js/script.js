
var apiKey = "6015d4614214e35f89f83b4825650637";
var searchHistory = [];

var searchFormEl = document.querySelector('#search-form');

var currentWeather = (function getCurrentWeather(searchInputVal) {

    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + searchInputVal + "&limit=1&appid=" + apiKey);

    .then(function(response) {
        return response.JSON();
    })

    .then(function(resonse) {
        var longitude = response.coord.longitude;
        var latitude = response.coord.latitude
    })
});

function handleSearchFormSubmit(event) {
    event.preventDefault();

    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        return;
    }

    var queryString = 'http://api.openweathermap.org/geo/1.0/direct?q=' + searchInputVal + "&limit=1&appid=" + apiKey;


    console.log(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

