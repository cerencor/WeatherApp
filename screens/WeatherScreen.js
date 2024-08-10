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
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(cityName);
  }, [cityName]);

  const fetchWeather = async (cityName) => {
    try {
      const weatherResponse = await fetch(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      const weatherJson = await weatherResponse.json();
      console.log("Weather response:", weatherJson);

      setTemperature(weatherJson.current.temp_c);
      setState(weatherJson.current.condition.text);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch weather data");
      setIsLoading(false);
    }
  };

  const getBackgroundColor = (temp) => {
    if (temp > 30) return "#f08080";
    else if (temp > 20) return "#fffacd";
    else if (temp > 10) return "#8fbc8f";
    else return "#add8e6";
  };

  const getIcon = (state) => {
    switch (state) {
      case "Sunny":
        return <Icon name="sunny-outline" type="ionicon" size={40} color="white" />;
      case "Cloudy":
        return <Icon name="cloud-outline" type="ionicon" size={40} color="white" />;
      case "Rainy":
        return <Icon name="rainy-outline" type="ionicon" size={40} color="white" />;
      case "Windy":
        return <Icon name="weather-windy" type="material-community" size={40} color="white" />;
      default:
        return <Icon name="snow-outline" type="ionicon" size={40} color="white" />;
    }
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
