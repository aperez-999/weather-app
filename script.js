//An api is used to get the weather information from the weather server
const apiKey = "1207796838ec0d48dbc90628962ea418";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

//Function to fetch weather data from the API
async function checkWeather (city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  //Check for response if typed an incorrect city gives error

  if(response.status == 404) {
    document.querySelector(".error-message").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json(); //await response.json is basically a JSON object to handle weather data requests

  document.querySelector(".city").innerHTML = data.name; //fetches the name inside the data displayed from the API server
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity-details").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind-details").innerHTML = data.wind.speed + " km/h";

  //Update Image according to weather conditions
  if(data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if(data.weather[0].main == "Clear"){
      weatherIcon.src = "images/clear.png";
  } else if(data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
  } else if(data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if(data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }      

  //Target the CSS Weather style to change display of weather details from none back to default value block
  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error-message").style.display = "none";

  // Add a short delay to ensure the display property takes effect before starting the animation
setTimeout(() => {
  document.querySelector(".weather").classList.add("fade-in");
}, 50);

}
  }

//On clicking the search button, call the checkWeather function with the input value
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

//On pressing Enter key, call the checkWeather function with the input value
searchBox.addEventListener("keydown",(event) => {
  if(event.key === "Enter") {
    checkWeather(searchBox.value);
  }
});
