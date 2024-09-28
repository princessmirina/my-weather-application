function weatherApp(event) {
  event.preventDefault();
  let weatherAppInput = document.querySelector("#weather-app-input");
  let weatherAppCity = document.querySelector("#weather-app-city");
  weatherAppCity.innerHTML = weatherAppInput.value;
}

let weatherAppForm = document.querySelector("#weather-app-form");
weatherAppForm.addEventListener("submit", weatherApp);
