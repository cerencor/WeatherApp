import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { Icon } from "@rneui/themed";
import { API_KEY } from "../services/WeatherAPIKey";

const WeatherScreen = ({ route }) => {
  const { cityName } = route.params;

  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
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
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${cityName}&days=5&aqi=no&alerts=no`
      );
      const weatherJson = await weatherResponse.json();

      console.log("Weather response for", cityName, ":", weatherJson);

      if (weatherJson.current && weatherJson.forecast) {
        setTemperature(weatherJson.current.temp_c);
        setHumidity(weatherJson.current.humidity);
        setState(weatherJson.current.condition.text);
        setForecast(weatherJson.forecast.forecastday);
      } else {
        setError("Unexpected API response. Please try again later.");
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Failed to fetch weather data for", cityName, ":", err);
      setError("Failed to fetch weather data");
      setIsLoading(false);
    }
  };

  const getBackgroundColor = (temp) => {
    if (temp > 30) return "#f08080";
    else if (temp > 20) return "#E2D139";
    else if (temp > 10) return "#8fbc8f";
    else return "#add8e6";
  };

  const getIcon = (state) => {
    switch (state) {
      case "Sunny":
        return <Icon name="sunny-outline" type="ionicon" size={30} color="white" />;
      case "Cloudy":
        return <Icon name="cloud-outline" type="ionicon" size={30} color="white" />;
      case "Rainy":
        return <Icon name="rainy-outline" type="ionicon" size={30} color="white" />;
      case "Windy":
        return <Icon name="weather-windy" type="material-community" size={30} color="white" />;
      default:
        return <Icon name="snow-outline" type="ionicon" size={30} color="white" />;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.forecastItemContainer}>
      <Text style={styles.dateText}>{item.date}</Text>
      {getIcon(item.day.condition.text)}
      <Text style={styles.temperatureText}>{item.day.avgtemp_c}°C</Text>
    </View>
  );

  const backgroundColor = getBackgroundColor(temperature);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <>
          <View style={styles.currentWeather}>
            <View style={styles.currentWeatherContent}>
              {getIcon(state)}
              <Text style={styles.nameOfCity}>{cityName}</Text>
              <Text style={styles.temperature}>{temperature}°C</Text>
              <Text style={styles.humidity}>Humidity: {humidity}%</Text>
            </View>
          </View>
          <View style={styles.forecastContainer}>
            <FlatList
              data={forecast}
              renderItem={renderItem}
              horizontal
              keyExtractor={(item) => item.date}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.forecastList}
            />
          </View>
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
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 50,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 15,
    padding: 20,
  },
  currentWeatherContent: {
    alignItems: "center",
  },
  nameOfCity: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  temperature: {
    fontSize: 32,
    marginTop: 20,
    color: "white",
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  humidity: {
    fontSize: 20,
    marginTop: 10,
    color: "white",
    fontWeight: "400",
  },
  forecastContainer: {
    flex: 1,
    width: "100%",
    paddingVertical: 200,
  },
  forecastList: {
    paddingHorizontal: 5,
  },
  forecastItemContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    borderRadius: 10,
    width: Dimensions.get("window").width * 0.17,
  },
  dateText: {
    fontSize: 14,
    color: "white",
  },
  temperatureText: {
    fontSize: 16,
    marginTop: 5,
    color: "white",
  },
});

export default WeatherScreen;
