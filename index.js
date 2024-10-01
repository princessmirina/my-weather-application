//get the response from api
function refreshTemperature(response) {
  let appTemp = document.querySelector("#app-temp");
  let temperature = response.data.temperature.current;
  let weatherAppCity = document.querySelector("#weather-app-city");

  console.log(response.data);

  weatherAppCity.innerHTML = response.data.city;
  appTemp.innerHTML = Math.round(temperature);

  //update description
  let decriptionElement = document.querySelector("#description");
  decriptionElement.innerHTML = response.data.condition.description;

  //update humidity
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity + "%";

  // update windy
  let windyElement = document.querySelector("#windy");
  windyElement.innerHTML = response.data.wind.speed + "km/h";

  // update time
  let timeElemetnt = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElemetnt.innerHTML = formatDate(date);

  // update weather-icon
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

  getForecast(response.data.city);
}
// update time
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

// call api
function cityName(city) {
  let apiKey = "3146t1140fd0d5bb8o78d46fad42f7bd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(refreshTemperature);
}

// prevent form from reloading
function weatherApp(event) {
  event.preventDefault();
  let weatherAppInput = document.querySelector("#weather-app-input");

  cityName(weatherAppInput.value);
}

// update the day
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

// Get forecast DATA
function getForecast(city) {
  let apiKey = "3146t1140fd0d5bb8o78d46fad42f7bd";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;

  // get the information inside our code using axios
  axios.get(apiUrl).then(displayForecast);
}

// inject the forecast HTML from JAVASCRIPT
function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `<div class="weather-forecast-details">
            <div class="weather-forecast-day">${formatDay(day.time)}</div>
            
            <img src="${
              day.condition.icon_url
            }" class="weather-forecast-icon" />
            
            <div class="weather-forecast-degree">
              <div class="weather-forecast-unit"><strong>${Math.round(
                day.temperature.maximum
              )}&#176;</strong></div>
              <div class="weather-forecast-unit2">${Math.round(
                day.temperature.minimum
              )}&#176;</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let weatherAppForm = document.querySelector("#weather-app-form");
weatherAppForm.addEventListener("submit", weatherApp);

cityName("Paris");
