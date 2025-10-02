
const API_KEY = '3ee7b3c33947e049728a24f22140fede';
const CITY = 'Taghazout';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';


async function getWeather() {
    const weatherContainer = document.getElementById('meteo');
    

    const weatherHTML = `
        <h2>Weather Forecast - Taghazout</h2>
        <div class="weather-widget" id="weatherWidget">
            <div class="loading">Loading weather data...</div>
        </div>
    `;
    
    weatherContainer.innerHTML = weatherHTML;

    try {
        const response = await fetch(
            `${API_URL}?q=${CITY}&appid=${API_KEY}&units=metric&lang=en`
        );

        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        document.getElementById('weatherWidget').innerHTML = `
            <div class="error">
                <p>⚠️ Error loading weather data</p>
                <p>Please check your internet connection or try again in a few minutes</p>
                <p style="font-size: 12px; opacity: 0.7;">If this is a new API key, it may take 10-15 minutes to activate</p>
            </div>
        `;
    }
}


function displayWeather(data) {
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const windSpeed = Math.round(data.wind.speed * 3.6); 
    const humidity = data.main.humidity;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    
 
    let surfConditions = getSurfConditions(windSpeed, data.weather[0].main);

    const weatherHTML = `
        <div class="weather-card">
         <img src="Image/james-lee-8bj3hSFpV4Q-unsplash.jpg" alt="" style="width:100%;height:100%;">
            <div class="weather-header">
                <div class="temp-info">
                    <div class="temperature">${temp}°C</div>
                    <div class="description">${description}</div>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="detail-item">
                    <span class="icon">🌡️</span>
                    <span class="label">Feels Like:</span>
                    <span class="value">${feelsLike}°C</span>
                </div>
                <div class="detail-item">
                    <span class="icon">💨</span>
                    <span class="label">Wind Speed:</span>
                    <span class="value">${windSpeed} km/h</span>
                </div>
                <div class="detail-item">
                    <span class="icon">💧</span>
                    <span class="label">Humidity:</span>
                    <span class="value">${humidity}%</span>
                </div>
                <div class="detail-item">
                    <span class="icon">🔽</span>
                    <span class="label">Pressure:</span>
                    <span class="value">${data.main.pressure} hPa</span>
                </div>
            </div>
            
            <div class="surf-conditions ${surfConditions.class}">
                <h3>🏄 Surf Conditions</h3>
                <p>${surfConditions.message}</p>
            </div>

            <div style="margin-top: 15px; text-align: center; font-size: 12px; opacity: 0.8;">
                <p>Last update: ${new Date().toLocaleTimeString('en-GB')}</p>
            </div>
        </div>
    `;

    document.getElementById('weatherWidget').innerHTML = weatherHTML;
}


function getSurfConditions(windSpeed, weather) {

    if (weather === 'Thunderstorm') {
        return {
            class: 'poor',
            message: '❌ Dangerous conditions! Thunderstorm - Stay out of the water!'
        };
    }
    
    if (windSpeed < 10) {
        return {
            class: 'excellent',
            message: '🌊 Excellent conditions! Light winds, perfect for surfing!'
        };
    } else if (windSpeed < 20) {
        return {
            class: 'good',
            message: '✅ Good conditions! Moderate winds, suitable for experienced surfers.'
        };
    } else if (windSpeed < 30) {
        return {
            class: 'moderate',
            message: '⚠️ Moderate conditions. Strong winds, recommended for advanced surfers only.'
        };
    } else {
        return {
            class: 'poor',
            message: '❌ Poor conditions. Very strong winds, not recommended for surfing.'
        };
    }
}


window.addEventListener('load', getWeather);


setInterval(getWeather, 600000);