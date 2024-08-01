import * as React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SearchScreen from './screens/SearchScreen';
import WeatherScreen from './screens/WeatherScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Weather" component={WeatherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});