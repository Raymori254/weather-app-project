const API_KEY = "39d93ec4e6a9a34548a1442a502b922f";

const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("temp");
const weatherCondition = document.getElementById("weather-condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const weatherData = document.getElementById("weather-data");
const loading = document.getElementById("loading");
const errorMsg = document.getElementById("error-msg");

async function getWeatherData(city) {
  try {
    loading.style.display = "block";
    weatherData.style.display = "none";
    errorMsg.style.display = "none";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error("City not found!");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    errorMsg.textContent = error.message;
    errorMsg.style.display = "block";
    weatherData.style.display = "none";
  } finally {
    loading.style.display = "none";
  }
}

function displayWeather(data) {
  cityName.textContent = data.name;
  temp.textContent = `${Math.round(data.main.temp)}°C`;
  weatherCondition.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  wind.textContent = Math.round(data.wind.speed * 3.6); // Convert m/s to km/h

  weatherData.style.display = "block";
}

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeatherData(city);
  }
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    const city = cityInput.value.trim();
    if (city) {
      getWeatherData(city);
    }
  }
});

getWeatherData("Nairobi");