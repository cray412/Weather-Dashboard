
var apiKey = "6015d4614214e35f89f83b4825650637";
var currentWeatherEl = document.querySelector("#current-weather");
var currentCityEl = document.querySelector(".current-city");
var currentWeatherIconEl = document.querySelector("#current-weather-icon")
var currentTempEl = document.querySelector(".current-temp");
var currentHumEl = document.querySelector(".current-humidity");
var currentWindEl = document.querySelector(".current-wind");
var searchHistory = [];

var searchFormEl = document.querySelector('#search-form');

function getCurrentWeather(query) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + query + "&appid=" + apiKey)

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var longitude = response.coord.lon;
            var latitude = response.coord.lat;

            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + "&lon=" + longitude + "&units=imperial&appid=" + apiKey)

                .then(function (response) {
                    return response.json();
                })

                .then(function (response) {
                    console.log(response);
                    var cityName = response.name;
                    var currentDate = moment().format("M/D/YYYY");
                    currentIcon = response.weather[0].icon;
                    var currentTemp = response.main.temp;
                    var currentHumidity = response.main.humidity;
                    var windSpeed = response.wind.speed;
                    var country = response.sys.country;

                    currentCityEl.textContent = cityName + " (" + currentDate + ")";
                    currentWeatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentIcon + ".png");
                    currentTempEl.textContent = "Temp: " + Math.round(currentTemp) + " \u00B0F";
                    currentWindEl.textContent = "Wind: " + windSpeed + " MPH";
                    currentHumEl.textContent = "Humidity: " + currentHumidity + "%";
                    currentWeatherEl.setAttribute("style", "border: 1px solid black");
                })

                .catch(function (error) {

                })
        })
};

function handleSearchFormSubmit(e) {
    e.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.log("Invalid Input!");
        return;
    }
    getCurrentWeather(searchInputVal);
    console.log(searchInputVal);


}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

