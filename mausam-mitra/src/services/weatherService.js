import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const GEO_BASE_URL = 'https://api.openweathermap.org/geo/1.0/direct';

/**
 * Processes the 5-day/3-hour forecast list to get a simplified daily forecast.
 */
const processDailyForecast = (list) => {
  const dailyData = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(' ')[0]; // Get the date part
    if (!dailyData[date]) {
      dailyData[date] = {
        temps: [],
        weather: [],
        dt: item.dt,
      };
    }
    dailyData[date].temps.push(item.main.temp);
    // Store weather info, prioritizing daytime icons
    if (item.sys.pod === 'd') {
        dailyData[date].weather.unshift(item.weather[0]);
    } else {
        dailyData[date].weather.push(item.weather[0]);
    }
  });

  return Object.values(dailyData).map((day) => {
    return {
      dt: day.dt,
      temp: {
        min: Math.min(...day.temps),
        max: Math.max(...day.temps),
      },
      weather: [day.weather[0]], // Use the most representative weather icon
    };
  }).slice(0, 5); // Return a 5-day forecast
};

export async function fetchWeather({ lat, lon, units = 'metric' }) {
  // Use Promise.all to fetch both current weather and forecast simultaneously
  const [weatherRes, forecastRes] = await Promise.all([
    axios.get(WEATHER_BASE_URL, {
      params: { lat, lon, units, appid: API_KEY },
    }),
    axios.get(FORECAST_BASE_URL, {
      params: { lat, lon, units, appid: API_KEY },
    }),
  ]);

  const weatherData = weatherRes.data;
  const forecastData = forecastRes.data;

  // Combine the results into a single object similar to the old 'onecall' structure
  return {
    current: {
      temp: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      wind_speed: weatherData.wind.speed,
      weather: weatherData.weather,
    },
    hourly: forecastData.list.slice(0, 8).map(item => ({ // Get next 24 hours (8 * 3-hour intervals)
        dt: item.dt,
        temp: item.main.temp,
        weather: item.weather,
    })),
    daily: processDailyForecast(forecastData.list),
    name: weatherData.name, // City name
    timezone: weatherData.timezone,
  };
}

export async function geocodeCity(city) {
  const res = await axios.get(GEO_BASE_URL, {
    params: { q: city, limit: 5, appid: API_KEY },
  });
  return res.data;
}