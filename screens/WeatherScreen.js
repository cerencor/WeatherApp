import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

const WeatherScreen = ({ route }) => {
  const { cityName, temperature, state } = route.params;

  const getBackgroundColor = (temp) => {
    if (temp > 30) return "#D3634A";
    else if (temp > 20) return "#F7C250";
    else if (temp > 10) return "#65E080";
    else return "#559EDF";
  };

  const getIcon = (stt) => {
    if (stt === "Sunny")
      return <Icon name="sunny-outline" size={50} color="white" />;
    else if (stt === "Cloudy")
      return <Icon name="cloud-outline" size={50} color="white" />;
    else if (stt === "Stormy")
      return <Icon name="thunderstorm-outline" size={50} color="white" />;
    else return <Icon name="rowing" />;
  };

  const backgroundColor = getBackgroundColor(temperature);
  const weatherIcon = getIcon(state);

  return (
    <View style={[styles.container, { backgroundColor }]}>
      {weatherIcon}
      <Text style={styles.title}>{cityName}</Text>
      <Text style={styles.temperature}>{temperature}°C</Text>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  temperature: {
    fontSize: 24,
    marginTop: 20,
  },
});

export default WeatherScreen;
