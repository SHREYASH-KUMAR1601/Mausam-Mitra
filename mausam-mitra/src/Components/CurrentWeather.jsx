import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export default function CurrentWeather() {
  const { data, units } = useContext(WeatherContext);
  if (!data) return null;

  const { current, name } = data; 
  const iconCode = current.weather[0].icon;
  const description = current.weather[0].description;
  const tempUnit = units === 'metric' ? '°C' : '°F';
  const windUnit = units === 'metric' ? 'm/s' : 'mph';

  return (
    <div className="bg-white bg-opacity-30 p-6 rounded-xl shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2> 
      <img
        src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
        alt={description}
      />
      <p className="text-4xl font-semibold">
        {Math.round(current.temp)}{tempUnit}
      </p>
      <p className="capitalize">{description}</p>
      <div className="flex space-x-4 mt-3">
        <div>
          <span className="font-bold">{current.humidity}%</span>
          <p className="text-sm">Humidity</p>
        </div>
        <div>
          <span className="font-bold">{current.wind_speed} {windUnit}</span>
          <p className="text-sm">Wind</p>
        </div>
      </div>
    </div>
  );
}