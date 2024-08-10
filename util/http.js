import axios from "axios";
import { API_KEY } from "../services/WeatherAPIKey";

const BACKEND_URL = "http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no";

export async function fetchWeather() {
  const response = await axios.get(BACKEND_URL);

  const weather = [];

  //console.log(response.data);
  for (const key in response.data) {
    const weatherObj = {
      id: key,
      name: response.data[key].name,
      temperature: response.data[key].temperature,
      state: response.data[key].state,
      forecast: response.data[key].forecast,
    };
    weather.push(weatherObj);
  }

  return weather;
};