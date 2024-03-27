import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [icon, setIcon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setHasPermission(true);
          const { latitude, longitude } = position.coords;
          const query = encodeURIComponent(`${latitude},${longitude}`);

          // Use a reverse geocoding API to get the city name
          const locationResponse = await axios.get(
            `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
          );
          const zipCode = locationResponse.data.results[0].components.postcode;
          const countryCode =
            locationResponse.data.results[0].components.country_code;

          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&units=imperial`
          );
          setWeatherData(weatherResponse.data);
          switch (weatherResponse.data.weather[0].icon) {
            case "01d":
              setIcon("/weather/clear_day.svg");
              break;
            case "01n":
              setIcon("/weather/clear_night.svg");
              break;
            case "02d":
              setIcon("/weather/few_clouds_day.svg");
              break;
            case "02n":
              setIcon("/weather/few_clouds_night.svg");
              break;
            case "03d":
            case "03n":
            case "04d":
            case "04n":
              setIcon("/weather/cloudy.svg");
              break;
            case "09d":
            case "09n":
              setIcon("/weather/shower_rain.svg");
              break;
            case "10d":
              setIcon("/weather/rain_day.svg");
              break;
            case "10n":
              setIcon("/weather/rain_night.svg");
              break;
            case "11d":
            case "11n":
              setIcon("/weather/thunderstorm.svg");
              break;
            case "13d":
            case "13n":
              setIcon("/weather/snow.svg");
              break;
            case "50d":
            case "50n":
              setIcon("/weather/mist.svg");
              break;
            default:
              setIcon("/weather/clear_day.svg");
              break;
          }
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setHasPermission(false);
        setError(err);
        setIsLoading(false);
      }
    );
  }, []);

  if (isLoading) {
    return (
      <div className="h-40 mb-6 rounded shadow-lg animate-pulse bg-slate-300"></div>
    );
  }

  if (!hasPermission) {
    return (
      <section className="p-4 mb-6 bg-white border border-gray-100 rounded shadow-lg">
        <div className="text-red-600">
          Grant location permission to get weather information
        </div>
      </section>
    );
  }

  return (
    <section className="p-4 mb-6 bg-white border border-gray-100 rounded shadow-lg">
      <h2 className="text-xl font-bold text-gray-700">
        Today's Weather in {weatherData.name}
      </h2>
      <div>
        <Image src={icon} width={120} height={120} alt="weather icon" />
        <p>Temperature: {Math.round(weatherData.main.temp * 10) / 10}°C</p>
        <p>Weather: {weatherData.weather[0].main}</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
      </div>
    </section>
  );
};

export default Weather;
