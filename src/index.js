function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.querySelector("#description");
  let description = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let humidity = response.data.temperature.humidity + "%";
  let wind = response.data.wind.speed + " m/s";
  let iconElement = document.querySelector("#icon");
  let iconUrl = response.data.condition.icon_url;
  iconElement.innerHTML = `<img src="${iconUrl}"class="current-temperature-icon"/>`;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = description;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  let apiKey = "820385at7d928f3622bfd9b464oa0468";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
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

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
function displayForecast() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast" id="forecast">
          <div class="row">
            <div class="colomn">
              <div class="weather-forecast-data">$(day)</div>
              <img
                src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png"
                alt=""
                srcset=""
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temperature-max"> 18 </span>
                <span class="weather-forecast-temperature-min"> 12 </span>
              </div>
            </div>
          </div>
        </div>
     `;
  });
}
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
displayForecast();
