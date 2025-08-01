import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import dayjs from 'dayjs';

export default function HourlyForecast() {
  const { data } = useContext(WeatherContext);
  if (!data || !data.hourly) return null;

  const hours = data.hourly.slice(0, 24);
  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-2">Hourly Forecast</h3>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {hours.map((h, i) => (
            <div
              key={i}
              className="bg-white bg-opacity-30 p-4 rounded-xl flex-shrink-0 text-center"
            >
              <p>{dayjs.unix(h.dt).format('ha')}</p>
              <img
                src={`https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png`}
                alt={h.weather[0].description}
                className="mx-auto"
              />
              <p>{Math.round(h.temp)}°</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}