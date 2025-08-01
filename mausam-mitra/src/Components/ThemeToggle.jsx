import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(WeatherContext);
  return (
    <button
      className="p-2 bg-white dark:bg-gray-800 rounded"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
