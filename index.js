function refreshTemperature(response) {
  let appTemp = document.querySelector("#app-temp");
  let temperature = response.data.temperature.current;
  let weatherAppCity = document.querySelector("#weather-app-city");
  weatherAppCity.innerHTML = response.data.city;
  appTemp.innerHTML = Math.round(temperature);
}

function cityName(city) {
  // call api
  let apiKey = "3146t1140fd0d5bb8o78d46fad42f7bd";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshTemperature);
}

function weatherApp(event) {
  event.preventDefault();
  let weatherAppInput = document.querySelector("#weather-app-input");

  cityName(weatherAppInput.value);
}

let weatherAppForm = document.querySelector("#weather-app-form");
weatherAppForm.addEventListener("submit", weatherApp);

cityName("Paris");
