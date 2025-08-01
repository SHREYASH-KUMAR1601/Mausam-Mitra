import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WeatherProvider } from './context/WeatherContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <WeatherProvider>
    <App />
  </WeatherProvider>
);
