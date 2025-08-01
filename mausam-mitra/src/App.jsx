import React, { useContext } from 'react';
import { WeatherContext } from './context/WeatherContext';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import UnitToggle from './components/UnitToggle';
import ThemeToggle from './components/ThemeToggle';

export default function App() {
  const { loading, error } = useContext(WeatherContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 dark:from-gray-800 dark:to-black text-gray-900 dark:text-gray-100 transition-colors">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <UnitToggle />
          <ThemeToggle />
        </div>
        <SearchBar />
        {loading && <div className="text-center">Loading…</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {!loading && !error && (
          <>
            <CurrentWeather />
            <HourlyForecast />
            <DailyForecast />
          </>
        )}
      </div>
    </div>
  );
}
