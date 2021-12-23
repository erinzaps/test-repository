function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
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
  let month = months[date.getMonth()];
  let today = date.getDate();
  return `${day}, ${month} ${today} ${hours}:${minutes}`;
}

function changeConditions(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector(".city").innerHTML =
    response.data.name;
  document.querySelector("#present-temp").innerHTML =
    Math.round(celsiusTemperature);
  document.querySelector("#present-sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#present-humidity"
  ).innerHTML = response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " m/s";
  document.querySelector("#date-time").innerHTML =
    formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=56dde9198f6220f02270c3298c636077&units=metric`;
  axios.get(apiUrl).then(changeConditions);
}

function cityChange(event) {
  event.preventDefault();
  let city = document.querySelector(
    "#city-entered"
  ).value;
  search(city);
}

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=56dde9198f6220f02270c3298c636077&units=metric`;
  axios.get(apiUrl).then(changeConditions);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(
    searchLocation
  );
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(
    "#present-temp"
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature =
    (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(
    fahrenheitTemperature
  );
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(
    "#present-temp"
  );
  temperatureElement.innerHTML = Math.round(
    celsiusTemperature
  );
}

let form = document.querySelector("form");
form.addEventListener("submit", cityChange);

let locationButton = document.querySelector(
  "#my-location"
);
locationButton.addEventListener(
  "click",
  getCurrentPosition
);

let fahrenheitLink = document.querySelector(
  "#fahrenheit-link"
);
fahrenheitLink.addEventListener(
  "click",
  displayFahrenheitTemperature
);

let celsiusLink = document.querySelector(
  "#celsius-link"
);
celsiusLink.addEventListener(
  "click",
  displayCelsiusTemperature
);

let celsiusTemperature = null;

search("Seattle");
