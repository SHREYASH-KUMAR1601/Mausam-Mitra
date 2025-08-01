import React, { createContext, useState, useEffect } from 'react';
import { fetchWeather } from '../services/weatherService';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [units, setUnits] = useState('metric');
  const [theme, setTheme] = useState('light');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (!coords.lat || !coords.lon) return;
    setLoading(true);
    setError(null);
    fetchWeather({ ...coords, units })
      .then(setData)
      .catch(() => setError('Failed to load weather data'))
      .finally(() => setLoading(false));
  }, [coords, units]);

  return (
    <WeatherContext.Provider
      value={{
        coords,
        setCoords,
        units,
        setUnits,
        theme,
        setTheme,
        data,
        loading,
        error,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
