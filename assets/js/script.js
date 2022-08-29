
var apiKey = "6015d4614214e35f89f83b4825650637";
var currentWeatherEl = document.querySelector("#current-weather");
var currentCityEl = document.querySelector("#current-city");
var currentWeatherIconEl = document.querySelector("#current-weather-icon")
var currentTempEl = document.querySelector("#current-temp");
var currentHumEl = document.querySelector("#current-humidity");
var currentWindEl = document.querySelector("#current-wind");
var currentUvEl = document.querySelector("#current-uv");
var currentUvValueEl = document.querySelector("#current-uv-value");
var searchHistory = [];

var searchFormEl = document.querySelector('#search-form');

function getCurrentWeather(city) {

    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=" + apiKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
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

            fetch("https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude)

                .then(function (response) {
                    return response.json();
                })

                .then(function (response) {
                    console.log(response);
                    var currentUv = response.value;

                    currentUvEl.textContent = "UV Index: ";
                    currentUvValueEl.textContent = currentUv;

                    if (currentUv <= 2) {
                        currentUvValueEl.classList.add("favorable");
                    } else if (currentUv > 2 && currentUv <= 7) {
                        currentUvValueEl.classList.add("moderate");
                    } else {
                        currentUvValueEl.classList.add("severe");
                    }
        })

})

        .catch (function (error) {

})
};

function handleSearchFormSubmit(e) {
    e.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.log("Invalid Input!");
        return;
    }
    currentUvValueEl.classList.remove("favorable", "moderate", "severe");
    getCurrentWeather(searchInputVal);

}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

