import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Icon } from "@rneui/themed";
import { API_KEY } from "../services/WeatherAPIKey";

const WeatherScreen = ({ route }) => {
  const { cityName } = route.params;

  const [temperature, setTemperature] = useState(null);
  //const [state, setState] = useState(null);
  //const [forecast, setForecast] = useState([]);

  useEffect(() => {
    fetchWeather(cityName);
  }, [cityName]);

  const fetchWeather = async (cityName) => {
    const weatherResponse = await axios(
      `https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly&appid={API_KEY}`
    );
    //https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={API key}
    //https://api.openweathermap.org/data/3.0/onecall/timemachine?lat={lat}&lon={lon}&dt={time}&appid={API key}
    //const weatherResponse = await axios.get(
    //`https://api.openweathermap.org/data/3.0/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    //);
    const weatherJson = await weatherResponse.json();
    console.log("Weather response:", weatherJson);

    setTemperature(weatherJson.main.temp);
    //setState(weatherJson.weather[0].main);
  };

  const getBackgroundColor = (temp) => {
    if (temp > 30) return "#f08080";
    else if (temp > 20) return "#fffacd";
    else if (temp > 10) return "#8fbc8f";
    else return "#add8e6";
  };

  const getIcon = (stt) => {
    if (stt === "Sunny")
      return (
        <Icon name="sunny-outline" type="ionicon" size={40} color="white" />
      );
    else if (stt === "Cloudy")
      return (
        <Icon name="cloud-outline" type="ionicon" size={40} color="white" />
      );
    else if (stt === "Rainy")
      return (
        <Icon name="rainy-outline" type="ionicon" size={40} color="white" />
      );
    else if (stt === "Windy")
      return (
        <Icon
          name="weather-windy"
          type="material-community"
          size={40}
          color="white"
        />
      );
    else
      return (
        <Icon name="snow-outline" type="ionicon" size={40} color="white" />
      );
  };

  const renderItem = ({ item }) => (
    <View style={styles.forecastContainer}>
      {getIcon(item.state)}
      <Text style={styles.temperatureText}>{item.temperature}°C</Text>
    </View>
  );

  const backgroundColor = getBackgroundColor(temperature);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <>
          <View style={styles.currentWeather}>
            {getIcon(state)}
            <Text style={styles.nameOfCity}>{cityName}</Text>
            <Text style={styles.temperature}>{temperature}°C</Text>
          </View>
          <FlatList
            data={forecast}
            renderItem={renderItem}
            horizontal
            style={styles.forecastList}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  currentWeather: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nameOfCity: {
    fontSize: 36,
    color: "white",
  },
  temperature: {
    fontSize: 32,
    marginTop: 20,
    color: "white",
  },
  forecastList: {
    flex: 1,
    width: "75%",
  },
  forecastContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  temperatureText: {
    fontSize: 16,
    marginTop: 5,
    color: "white",
  },
});

export default WeatherScreen;
