// Replace with your OpenWeatherMap API key
const apiKey = '309af0b54838e3137d1e0559251bd0ef';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

// DOM elements
const locationInput = document.getElementById('location');
const getWeatherBtn = document.getElementById('get-weather');
const weatherInfo = document.getElementById('weather-info');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');

// Function to get weather and update UI
async function getWeather() {
    const city = locationInput.value.trim();
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();

        // Update UI with weather data
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `Temperature: ${data.main.temp}°C`;
        description.textContent = `Condition: ${data.weather[0].description}`;
        humidity.textContent = `Humidity: ${data.main.humidity}%`;
        wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

        // Show weather info
        weatherInfo.classList.remove('hidden');

        // Dynamically change background based on weather
        updateBackground(data.main.temp, data.weather[0].main.toLowerCase());
    } catch (error) {
        alert('Error fetching weather data: ' + error.message);
    }
}

// Function to update background class based on temp and condition
function updateBackground(temp, condition) {
    document.body.className = 'default'; // Reset to default

    if (temp > 25 && (condition.includes('clear') || condition.includes('sun'))) {
        document.body.classList.add('sunny');
    } else if (temp < 10 && condition.includes('snow')) {
        document.body.classList.add('winter');
    } else if (condition.includes('rain') || condition.includes('drizzle')) {
        document.body.classList.add('rainy');
    } else if (condition.includes('cloud')) {
        document.body.classList.add('cloudy');
    }
    // Add more conditions as needed (e.g., thunderstorm, fog)
}

// Event listener for button
getWeatherBtn.addEventListener('click', getWeather);

// Allow Enter key to trigger search
locationInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        getWeather();
    }
});