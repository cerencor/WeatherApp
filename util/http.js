import axios from "axios";

const BACKEND_URL = "https://weatherapp-fe698-default-rtdb.europe-west1.firebasedatabase.app/";

export async function fetchWeather() {
  const response = await axios.get(BACKEND_URL + "weather.json");

  const weather = [];

  console.log(response.data);
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
}
