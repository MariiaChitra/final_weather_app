let now = new Date();
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let h5 = document.querySelector("h5");
h5.innerHTML = `${hour}:${minute} ${day} ${now.getDate()} ${month} ${now.getFullYear()}`;

// Code for Displaying the Forecast

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let day = days[date.getDay()];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forcastElement = document.querySelector(".weekForcast");

  // let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forcast.forEach(function (forcastDay, index) {
    if (index < 6) {
      forcastHTML =
        forcastHTML +
        `<div class="col-2">
    <div class="day">${formatDay(forcastDay.dt)}</div> 
      <img class = "fIcons" src="http://openweathermap.org/img/wn/${
        forcastDay.weather[0].icon
      }@2x.png" alt="cloudy" />
    <div class="temp"> <span class="low">${Math.round(
      forcastDay.temp.min
    )}</span>°/ <span class="high"> ${Math.round(
          forcastDay.temp.max
        )}</span>°</div>
  `;
      forcastHTML = forcastHTML + `</div>`;
    }
  });

  forcastElement.innerHTML = forcastHTML;
}

function getForcast(coords) {
  console.log(coords);
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function searchPlace(city) {
  let apiKey = "97852d4a29a006cb23ee815273ca6a59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function displayWeatherDetails(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#feels_like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function displayWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;
  searchPlace(city);
}
function searchLocation(position) {
  let apiKey = "97852d4a29a006cb23ee815273ca6a59";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherDetails);
}

function actualPlaceLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let replaceLocation = document.querySelector("#form");
replaceLocation.addEventListener("submit", displayWeather);

let currentLocationButton = document.querySelector("#current_city");
currentLocationButton.addEventListener("click", actualPlaceLocation);
searchPlace("Bat Yam");
