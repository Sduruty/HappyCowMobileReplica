import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icons & colors
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

// Data
import restaurants from "./assets/restaurants.json";

// Screens
import FavoritesScreen from "./containers/FavoritesScreen";
import MapScreen from "./containers/MapScreen";
import SingleRestaurantScreen from "./containers/SingleRestaurantScreen";
import AllRestaurantsScreen from "./containers/AllRestaurantsScreen";
import SplashScreen from "./containers/SplashScreen";
import LoginScreen from "./containers/LoginScreen";
import SignUpScreen from "./containers/SignUpScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [ userToken, setUserToken]= usestate(null);
  const [userId, setUserId]=useState(null);
  //const [favorite, setFavorite] = useState([]);

// save or remove token in AsyncStorage & state
const setToken = async (token) => {
  if (token) {
    AsyncStorage.setItem("userToken", token);
    setUserToken(token);
  } else {
    AsyncStorage.removeItem("userToken");
    setUserToken(null);
  }
};

// save or remove id in AsyncStorage & state
const setId = async (id) => {
  if (id) {
    AsyncStorage.setItem("userId", id);
    setUserId(id);
  } else {
    AsyncStorage.removeItem("userId");
    setUserId(null);
  }
};


useEffect(() => {
  const bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    const userId = await AsyncStorage.getItem("userId");
    setUserToken(userToken);
    setUserId(userId);
    setIsLoading(false);
  };

  bootstrapAsync();
}, []);


  return (
    <NavigationContainer>
      {isLoading ? null : userToken === null ?(
        <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="splashScreen">
          {() => <SplashScreen />}
        </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "green",
            inactiveTintColor: "#6D3FAD",
          }}
        >
          <Tab.Screen
            name="Explorer"
            options={{
              tabBarLabel: "Explorer",
              tabBarIcon: ({ color, size }) => (
                <AntDesign name="search1" size={24} color="#6D3FAD" />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="restaurantsScreen"
                  options={{ header: () => null, animationEnabled: false }}
                >
                  {() => (
                    <AllRestaurantsScreen
                      data={restaurants}
                      favorite={favorite}
                      setFavorite={setFavorite}
                    />
                  )}
                </Stack.Screen>

                <Stack.Screen name="Restaurant">
                  {() => <SingleRestaurantScreen data={restaurants} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
          <Tab.Screen
            name="Favoris"
            options={{
              tabBarLabel: "Favoris",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="favorite" size={24} color="#6D3FAD" />
              ),
            }}
          >
            {() => <FavoritesScreen />}
          </Tab.Screen>
          <Tab.Screen
            name="Map"
            options={{
              tabBarLabel: "Map",
              tabBarIcon: ({ color, size }) => (
                <FontAwesome name="map-marker" size={24} color="#6D3FAD" />
              ),
            }}
          >
            {() => (
              <Stack.Navigator>
                <Stack.Screen
                  name="Map"
                  options={{
                    title: "Map",
                    tabBarLabel: "Map",
                  }}
                >
                  {() => <MapScreen data={restaurants} />}
                </Stack.Screen>
              </Stack.Navigator>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
