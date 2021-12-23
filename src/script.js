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

function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
  return days[day];
}

function displayFutureConditions(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector(
    "#future-conditions"
  );

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col weekday">
              <div class="forecast-day">${formatWeekday(
                forecastDay.dt
              )}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="part-cloud"
                class="img-part-sun future"
              />
              <div class="temp-range">
                <span class="forecast-temp-high"
                  >${Math.round(
                    forecastDay.temp.max
                  )}°</span
                >
                <span class="forecast-temp-low"
                  >${Math.round(
                    forecastDay.temp.min
                  )}°</span
                >
              </div>
            </div>
          `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=56dde9198f6220f02270c3298c636077&units=metric`;
  axios.get(apiUrl).then(displayFutureConditions);
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
  getForecast(response.data.coord);
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

let form = document.querySelector("form");
form.addEventListener("submit", cityChange);

let locationButton = document.querySelector(
  "#my-location"
);
locationButton.addEventListener(
  "click",
  getCurrentPosition
);

search("Seattle");
