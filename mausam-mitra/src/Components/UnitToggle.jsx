import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export default function UnitToggle() {
  const { units, setUnits } = useContext(WeatherContext);
  return (
    <div className="flex space-x-2">
      <button
        className={`px-3 py-1 rounded ${
          units === 'metric' ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
        onClick={() => setUnits('metric')}
      >
        °C
      </button>
      <button
        className={`px-3 py-1 rounded ${
          units === 'imperial' ? 'bg-blue-500 text-white' : 'bg-white'
        }`}
        onClick={() => setUnits('imperial')}
      >
        °F
      </button>
    </div>
  );
}
