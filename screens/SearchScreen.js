import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SearchBar, ListItem } from "@rneui/themed";
import citydata from "../data/citydata";
//import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";

import {fetchWeather} from '../util/http';

const SearchScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    async function getWeather(){
      const weather = await fetchWeather();
    }
    getWeather();
    //setFullData(citydata);
    //setFilteredData(citydata);
  }, []);

  const navigation = useNavigation();

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedQuery = query.toLowerCase();
    console.log("formatted query: ", formattedQuery);
    const filteredData = fullData.filter((city) => {
      return city.name.toLowerCase('tr-TR').includes(formattedQuery);
    });
    setFilteredData(filteredData);
  };

  const contains = ({ name }, query) => {
    if (name.toLowerCase().includes(query)) {
      return true;
    }
    return false;
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
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemWrapper}>
              <ListItem
                containerStyle={styles.itemContainer}
                onPress={() =>
                  navigation.navigate("Weather", {
                    cityName: item.name,
                    temperature: item.temperature,
                    state: item.state,
                    forecast: item.forecast,
                  })
                }
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.textCityName}>
                    {item.name}
                  </ListItem.Title>
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
});

export default SearchScreen;
