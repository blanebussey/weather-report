var apiKey = "7a6b3354e50774f952a848fe125c2899"
var nameInputEl = document.querySelector("#city");
var userFormEl = document.querySelector("#weathercast")
var currentCity = document.getElementById("cityName")



var formSubmitHandler = function(event) {
    event.preventDefault();
    var cityWeather = nameInputEl.value.trim();

    if(cityWeather) {
        getCity(cityWeather) 
        nameInputEl.value = "";   
    }
}
var getCity = function(cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`

    fetch(apiUrl).then(function(response){ 
       return response.json()
    })
    .then(function(data){
        console.log(data)
        currentCity.textContent = data.name

    })
}

userFormEl.addEventListener("submit", formSubmitHandler);
getCity()
