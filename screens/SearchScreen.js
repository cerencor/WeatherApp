import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SearchBar, ListItem } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import { API_KEY } from "../services/WeatherAPIKey";
import citydata from "../data/citydata"; // Import the city data

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    // Set fullData to a list of city names initially
    const cityNames = citydata.map((city) => ({
      id: city.id,
      name: city.name,
    }));
    setFullData(cityNames);
  }, []);

  const navigation = useNavigation();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setIsLoading(true);

    try {
      const formattedQuery = query.toLowerCase();
      const filteredCities = fullData.filter((city) =>
        city.name.toLowerCase().includes(formattedQuery)
      );

      const updatedFilteredData = await Promise.all(
        filteredCities.map(async (city) => {
          const weatherResponse = await fetch(
            `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city.name}&aqi=no`
          );
          const weatherJson = await weatherResponse.json();
          return {
            ...city,
            temperature: weatherJson.current.temp_c,
            state: weatherJson.current.condition.text,
          };
        })
      );

      setFilteredData(updatedFilteredData);
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={(query) => handleSearch(query)}
        lightTheme={true}
        round={true}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        placeholderTextColor="#E9E9E9"
        leftIconContainerStyle={{ display: "none" }}
        inputStyle={{ color: "#fefefe" }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#66666B" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <ListItem
                containerStyle={styles.itemContainer}
                onPress={() =>
                  navigation.navigate("Weather", {
                    cityName: item.name,
                    temperature: item.temperature,
                    state: item.state,
                    forecast: item.forecast, // You can keep this if you still want to show some static forecast data
                  })
                }
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.textCityName}>
                    {item.name}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.textCityTemp}>
                    {item.temperature}°C, {item.state}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFB747",
  },
  searchBarContainer: {
    backgroundColor: "#EFB747",
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
  },
  searchBarInputContainer: {
    backgroundColor: "#DFAC45",
  },
  itemWrapper: {
    alignItems: "center",
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFAC45",
    alignSelf: "flex-start",
    maxWidth: "90%",
    borderRadius: 300,
    padding: 10,
    flexShrink: 1,
  },
  textCityName: {
    fontSize: 17,
    marginLeft: 10,
    fontWeight: "600",
    color: "#fefefe",
  },
  textCityTemp: {
    fontSize: 15,
    marginLeft: 10,
    color: "#fefefe",
  },
});

export default SearchScreen;
