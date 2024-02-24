import React, { useState } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error404, setError404] = useState(false);

  const APIKey = '33f55d08aea0fd89d526b3f3bd9620b6';

  const handleSearch = () => {
    if (!city.trim()) {
      // Trim the input to check if it is not empty after removing leading and trailing whitespaces
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
      .then(response => response.json())
      .then(json => {
        if (json.cod === '404') {
          setError404(true);
          setWeatherData(null);
          return;
        }

        setError404(false);

        setWeatherData({
          image: getWeatherImage(json.weather[0].main),
          temperature: `${parseInt(json.main.temp)}°C`,
          description: json.weather[0].description,
          humidity: `${json.main.humidity}%`,
          wind: `${parseInt(json.wind.speed)}Km/h`
        });
      });
  };

  const getWeatherImage = (weatherType) => {
    switch (weatherType) {
      case 'Clear':
        return 'clear.png';
      case 'Rain':
        return 'rain.png';
      case 'Snow':
        return 'snow.png';
      case 'Clouds':
        return 'cloud.png';
      case 'Haze':
        return 'mist.png';
      default:
        return '';
    }
  };

  return (
    <div className="container">
      <div className="search-box">
        <i className="fa-solid fa-location-dot"></i>
        <input type="text" placeholder="Enter your location" onChange={(e) => setCity(e.target.value)} />
        <button className="fa-solid fa-magnifying-glass" onClick={handleSearch}>
          Search
        </button>
      </div>

      {error404 && (
        <div className="not-found">
          <img src="404.png" alt="Not Found" />
          <p>Oops! Invalid location :/</p>
        </div>
      )}

      {weatherData && (
        <>
          <div className="weather-box">
            <img src={weatherData.image} alt="Weather Icon" />
            <p className="temperature">{weatherData.temperature}</p>
            <p className="description">{weatherData.description}</p>
          </div>

          <div className="weather-details">
            <div className="humidity">
              <i className="fa-solid fa-water"></i>
              <div className="text">
                <span>{weatherData.humidity}</span>
                <p>Humidity</p>
              </div>
            </div>
            <div className="wind">
              <i className="fa-solid fa-wind"></i>
              <div className="text">
                <span>{weatherData.wind}</span>
                <p>Wind Speed</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default WeatherApp;
