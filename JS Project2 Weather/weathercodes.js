const iconElement = document.querySelector(".sääIkonit");
const tempElement = document.querySelector(".lämpöAsteet p");
const descElement = document.querySelector(".lämpötilanSelitys p");
const locationElement = document.querySelector(".paikkakunta p");
const notificationElement = document.querySelector(".ilmoitus");

const weather = {};

weather.temperature = {
unit : "celsius"
}

// Kelvin-vakio ja vakio API-avaimelle, joka saatu openweathermapsista
const KELVIN = 273;
const key = "1108cdc1b80450e7e2b3e65fa4bc0c9c";

// Tarkista, tukeeko selain paikkatietoja
if('geolocation' in navigator){
navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
notificationElement.style.display = "block";
notificationElement.innerHTML = "<p>Oh no! Syntax error! Change browser, please!</p>";
}

// Asetetaan käyttäjän lokaatio
function setPosition(position){
let latitude = position.coords.latitude;
let longitude = position.coords.longitude;
    
getWeather(latitude, longitude);
}

// Näytetään virheilmoitus jos paikannusta ei tueta
function showError(error){
notificationElement.style.display = "block";
notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Haetaan säätiedot käyttäjän lokaation perusteella openeweathermapista...
function getWeather(latitude, longitude){
let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
fetch(api)
.then(function(response){
let data = response.json();
return data;
})
.then(function(data){
weather.temperature.value = Math.floor(data.main.temp - KELVIN);
weather.description = data.weather[0].description;
weather.iconId = data.weather[0].icon;
weather.city = data.name;
weather.country = data.sys.country;
})
.then(function(){
displayWeather();
});
}
// Tulostetaan säätiedot näkyviin
function displayWeather(){
iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
descElement.innerHTML = weather.description;
locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Tämä oli vaikea! Apuja etsittiin. Vaihtaa celsiukset fahrenheitiksi
function celsiusToFahrenheit(temperature){
return (temperature * 9/5) + 32;
}

// Lisätään klikkaus, jolla asteikko vaihtuu celsiuksesta fahrenheitiksi. Hard!
tempElement.addEventListener("click", function(){
if(weather.temperature.value === undefined) return;    
if(weather.temperature.unit == "celsius"){
let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
fahrenheit = Math.floor(fahrenheit);        
tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
weather.temperature.unit = "fahrenheit";
}else{
tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
weather.temperature.unit = "celsius"
}
});