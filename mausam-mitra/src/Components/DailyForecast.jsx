import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';
import dayjs from 'dayjs';

export default function DailyForecast() {
  const { data, units } = useContext(WeatherContext);
  if (!data || !data.daily) return null;

  const days = data.daily;
  const tempUnit = units === 'metric' ? '°C' : '°F';

  return (
    <div className="my-6">
      <h3 className="text-xl font-semibold mb-2">Next 5 Days</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {days.map((d, i) => (
          <div
            key={i}
            className="bg-white bg-opacity-30 p-4 rounded-xl text-center"
          >
            <p>{dayjs.unix(d.dt).format('ddd')}</p>
            <img
              src={`https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`}
              alt={d.weather[0].description}
              className="mx-auto"
            />
            <p className="font-semibold">
              {Math.round(d.temp.max)}{tempUnit} / {Math.round(d.temp.min)}{tempUnit}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}