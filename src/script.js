// city search bar
function formatDate(timestamp) {
  date = new Date(timestamp);
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
  let date = getDate();
  return `${day}, ${month} ${date} ${hours}:${minutes}`;
}

function changeConditions(response) {
  document.querySelector(".city").innerHTML =
    response.data.name;
  document.querySelector("#present-temp").innerHTML =
    Math.round(response.data.main.temp) + "°C";
  document.querySelector("#present-sky").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#present-humidity"
  ).innerHTML = response.data.main.humidity + "%";
  document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + " m/s";
  document.querySelector("#date-time").innerHTML =
    formatDate(response.data.dt * 1000);
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

let form = document.querySelector("form");
form.addEventListener("submit", cityChange);

search("Seattle");

//current location button
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

let locationButton = document.querySelector(
  "#my-location"
);
locationButton.addEventListener(
  "click",
  getCurrentPosition
);

// current date/time/conditions

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
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

let date = now.getDate();

let hour = now.getHours();
if (hour < 10) {
  hours = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDateTime =
  document.querySelector(".date-time");

currentDateTime.innerHTML = `${day}, ${month} ${date}, ${hour}:${minute}`;

// // fahrenheit-celsius toggle
// function tempF() {
//   let currentGenTemp = document.querySelector()
//   let tempFahr = document.querySelector(
//     "#present-temp"
//   );
//   tempFahr.innerHTML = "57°";
// }

// let fahrenheit = document.querySelector("#fahrenheit");
// fahrenheit.addEventListener("click", tempF);

// function tempC() {
//   let tempCels = document.querySelector(
//     ".present-temp"
//   );
//   tempCels.innerHTML = "";
// }

// let celsius = document.querySelector("#celsius");
// celsius.addEventListener("click", tempC);
