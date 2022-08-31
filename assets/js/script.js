// Global variables

var apiKey = "6015d4614214e35f89f83b4825650637";
var currentWeatherEl = document.querySelector("#current-weather");
var currentCityEl = document.querySelector("#current-city");
var currentWeatherIconEl = document.querySelector("#current-weather-icon")
var currentTempEl = document.querySelector("#current-temp");
var currentHumEl = document.querySelector("#current-humidity");
var currentWindEl = document.querySelector("#current-wind");
var currentUvEl = document.querySelector("#current-uv");
var currentUvValueEl = document.querySelector("#current-uv-value");
var searchFormEl = document.querySelector("#search-form");
var forecastTitleEl = document.querySelector("#forecast-title");
var searchHistoryEl = document.querySelector("#search-list");

var searchHistory = [];


function getCurrentWeather(city) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;
            var cityName = response.name;
            var currentDate = moment().format("M/D/YYYY");
            var currentIcon = response.weather[0].icon;
            var currentTemp = response.main.temp;
            var currentHumidity = response.main.humidity;
            var windSpeed = Math.round(response.wind.speed);
            var country = response.sys.country;

            currentCityEl.textContent = cityName + ", " + country + " (" + currentDate + ")";
            currentWeatherIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + currentIcon + ".png");
            currentTempEl.textContent = "Temp: " + Math.round(currentTemp) + " \u00B0F";
            currentWindEl.textContent = "Wind: " + windSpeed + " MPH";
            currentHumEl.textContent = "Humidity: " + currentHumidity + "%";
            currentWeatherEl.setAttribute("style", "border: 1px solid black");




                var savedSearchHistory = (JSON.parse(localStorage.getItem("savedCities")));

                function showHistory() {
                    for (var i = 0; i < searchHistory.length; i++) {
                        var searches = searchHistory[i];

                        var li = document.createElement("li");
                        li.setAttribute("data-index", i);

                        var button = document.createElement("button");
                        button.classList.add("saved-button")
                        button.textContent = searches;

                        li.appendChild(button);
                        searchHistoryEl.appendChild(li);
                        console.log(searches);
                    }
                }

                if (savedSearchHistory !== null) {
                    searchHistory = savedSearchHistory
                }


                if (!searchHistory) {
                    searchHistory = [];
                }

                showHistory();


                searchHistory.push(cityName);
                localStorage.setItem("savedCities", JSON.stringify(searchHistory));


                fetch("https://api.openweathermap.org/data/2.5/uvi?q=" + city + "&appid=" + apiKey + "&lat=" + latitude + "&lon=" + longitude)

                    .then(function (response) {
                        return response.json();
                    })

                    .then(function (response) {
                        var currentUv = Math.round(response.value);

                        currentUvEl.textContent = "UV Index: ";
                        currentUvValueEl.textContent = currentUv;


                        if (currentUv <= 2) {
                            currentUvValueEl.classList.add("favorable");
                        } else if (currentUv > 2 && currentUv < 8) {
                            currentUvValueEl.classList.add("moderate");
                        } else {
                            currentUvValueEl.classList.add("severe");
                        }
                    })



        })

}

function getForecast(city) {

    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial")

        .then(function (response) {
            return response.json();
        })

        .then(function (response) {
            var latitude = response.coord.lat;
            var longitude = response.coord.lon;

            forecastTitleEl.textContent = "5-Day Forecast:";

            fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial")

                .then(function (response) {
                    return response.json();
                })

                .then(function (response) {

                    for (i = 0; i < 5; i++) {

                        var forecastCardEl = document.querySelector("#forecast-card-" + (i + 1));
                        forecastCardEl.classList.add("forecast-card");

                        var forecastDateEl = document.querySelector("#forecast-date-" + (i + 1));
                        date = moment().add(i + 1, "d").format("M/D/YYYY");
                        forecastDateEl.textContent = date;

                        var forecastIconEl = document.querySelector("#forecast-icon-" + (i + 1));
                        forecastWeatherIcon = response.list[i].weather[0].icon;
                        forecastIconEl.setAttribute("src", "https://openweathermap.org/img/wn/" + forecastWeatherIcon + ".png");

                        var forecastTempEl = document.querySelector("#forecast-temp-" + (i + 1));
                        forecastTempEl.textContent = "Temp: " + Math.round(response.list[i].main.temp) + "\u00B0F";

                        var forecastWindEl = document.querySelector("#forecast-wind-" + (i + 1));
                        forecastWindEl.textContent = "Wind: " + Math.round(response.list[i].wind.speed) + " MPH";

                        var forecastHumidityEl = document.querySelector("#forecast-humidity-" + (i + 1));
                        forecastHumidityEl.textContent = "Humidity: " + Math.round(response.list[i].main.humidity) + "%";


                    }

                });
        })
}

function handleSearchFormSubmit(e) {
    e.preventDefault();
    var searchInputVal = document.querySelector('#search-input').value;

    if (!searchInputVal) {
        console.log("Invalid Input!");
        return;
    }
    else { }
    currentUvValueEl.classList.remove("favorable", "moderate", "severe");
    getCurrentWeather(searchInputVal);
    getForecast(searchInputVal);

}



// console.log(searchHistory);

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

