function fetchCityData() {
    const apiKey = '7ed50c73d0555fc810813e0c72659987';
    const cityName = document.getElementById('input-value').value.trim();
  
    if (cityName === '') {
      alert('Please enter a city name');
      return;
    }
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        const city = data.name;
        const temperatureKelvin = data.main.temp;
        const temperatureCelsius = temperatureKelvin - 273.15;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherCondition = data.weather[0].main;
  
        document.getElementById('city-name').textContent = `${city}`;
        document.getElementById('temperature').textContent = `${temperatureCelsius.toFixed(2)} °C`;
        document.getElementById('humidity').textContent = `${humidity}%`;
        document.getElementById('wind-speed').textContent = `${windSpeed} m/s`;
        
        const weatherIconElement = document.getElementById('weatherIcon');
        weatherIconElement.innerHTML = `<i class="wi ${getWeatherIcon(weatherCondition)}"></i>`;
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  function getWeatherIcon(weatherCondition) {
    const iconMap = {
      'Clear': 'wi-day-sunny',
      'Clouds': 'wi-cloudy',
      'Rain': 'wi-rain',
      'Drizzle': 'wi-showers',
      'Thunderstorm': 'wi-thunderstorm',
      'Snow': 'wi-snow',
      'Mist': 'wi-fog',
    };
  
    return iconMap[weatherCondition] || 'wi-day-sunny';
  }