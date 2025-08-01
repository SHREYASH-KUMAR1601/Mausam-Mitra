import React, { useState, useContext } from 'react';
import { geocodeCity } from '../services/weatherService';
import { WeatherContext } from '../context/WeatherContext';

export default function SearchBar() {
  const { setCoords } = useContext(WeatherContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (!val.trim()) return setSuggestions([]);
    try {
      const results = await geocodeCity(val);
      setSuggestions(results);
    } catch {
      setSuggestions([]);
    }
  };

  const selectCity = ({ lat, lon, name, country }) => {
    setQuery(`${name}, ${country}`);
    setSuggestions([]);
    setCoords({ lat, lon });
  };

  return (
    <div className="relative w-full max-w-md mx-auto my-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search city"
        className="w-full p-3 text-black placeholder-gray-500 rounded-lg shadow focus:outline-none"
      />
      {suggestions.length > 0 && (
        <ul className="absolute bg-white text-black w-full mt-1 rounded-lg shadow z-10">
          {suggestions.map((s, i) => (
            <li
              key={i}
              onClick={() => selectCity(s)}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              {s.name}, {s.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
