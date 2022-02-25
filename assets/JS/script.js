var storageKey = 'pastSearches';
var apiKey = "7a6b3354e50774f952a848fe125c2899"
var nameInputEl = document.getElementById("city");
var userFormEl = document.getElementById("weathercast")
var currentCity = document.getElementById("cityName")
var past = document.getElementById("pastSearches");
var currentWeather = document.getElementById("currentWeather")

var temp = document.getElementById("temp")
var humidity = document.getElementById("humidity")
var wind = document.getElementById("wind")
var uv = document.getElementById("uv")

var day1 = document.getElementById("day1")
var temp1 = document.getElementById("temp1")
var wind1 = document.getElementById("wind1")
var humidity1 = document.getElementById("humidity1")

var day2 = document.getElementById("day2")
var temp2 = document.getElementById("temp2")
var wind2 = document.getElementById("wind2")
var humidity2 = document.getElementById("humidity2")

var day3 = document.getElementById("day3")
var temp3 = document.getElementById("temp3")
var wind3 = document.getElementById("wind3")
var humidity3 = document.getElementById("humidity3")

var day4 = document.getElementById("day4")
var temp4 = document.getElementById("temp4")
var wind4 = document.getElementById("wind4")
var humidity4 = document.getElementById("humidity4")

var day5 = document.getElementById("day5")
var temp5 = document.getElementById("temp5")
var wind5 = document.getElementById("wind5")
var humidity5 = document.getElementById("humidity5")



// 

var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityWeather = nameInputEl.value.trim();

    if (cityWeather) {
        getCity(cityWeather)
        nameInputEl.value = "";
    }
}

//

var getCity = function (cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(apiUrl).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            console.log(data)
            var pastSearches = getStorage();
            if (!pastSearches.includes(data.name)) {
                pastSearches.unshift(data.name)
                setStorage(pastSearches);
            }
            currentCity.textContent = data.name
            getForecast(data.coord.lat, data.coord.lon);
        })
}

var getForecast = function (lat, lon) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
    fetch(apiUrl).then(function (response) {
        return response.json()
    })
        .then(function (data) {
            console.log(data)
            temp.textContent = data.current.temp + " degrees F";
            humidity.textContent = data.current.humidity + " humidity";
            uv.textContent = data.current.uvi + " uvi";
            wind.textContent = data.current.wind_speed + " wind speed";
            for (let i = 2; i < 6; i++) {
                const daily = data.daily[i - 1]
                console.log(i)
                document.getElementById(`day${i}`).textContent = (new Date(daily.dt * 1000)).toLocaleDateString()
                document.getElementById(`temp${i}`).textContent = daily.temp.day + "º F";
                document.getElementById(`wind${i}`).textContent = daily.wind_speed + " wind";
                document.getElementById(`humidity${i}`).textContent = daily.humidity + " humidity";
            }
        })
}


function setStorage(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
    renderPastSearches(data)
}

function renderPastSearches(data) {
    const pastSearches = document.getElementById("pastSearches")
    pastSearches.innerHTML = ""
    for (let pastSearch of data) {
        const pastSearchElement = document.createElement("div")
        pastSearchElement.textContent = pastSearch
        pastSearchElement.addEventListener("click", ()=>{
            getCity(pastSearch)
        })
        pastSearches.appendChild(pastSearchElement)
    }
}

function getStorage() {
    const data = localStorage.getItem(storageKey);
    if (!data) return []; //nothing in storage, return empty array
    const parsedData = JSON.parse(data);
    return parsedData
}

window.onload = ()=>{
    renderPastSearches(getStorage())
}
// 

userFormEl.addEventListener("submit", formSubmitHandler);

