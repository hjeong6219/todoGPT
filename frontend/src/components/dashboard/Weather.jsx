import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const query = encodeURIComponent(`${latitude},${longitude}`);

          // Use a reverse geocoding API to get the city name
          const locationResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
          );
          const zipCode = locationResponse.data.results[0].components.postcode;
          const countryCode =
            locationResponse.data.results[0].components.country_code;

          console.log(zipCode);

          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
          );
          setWeatherData(weatherResponse.data);
          console.log(weatherResponse.data);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>Today's Weather in {weatherData.name}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Weather: {weatherData.weather[0].main}</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
    </div>
  );
};

export default Weather;
