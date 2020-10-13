import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen";
import RegionsScreen from "./screens/RegionsScreen";
import CountriesScreen from "./screens/CountriesScreen";

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            let icon;
            let iconName;

            if (route.name === "Home") {
              iconName = "";
              icon = require("./assets/Images/globe.png");
            } else if (route.name === "Countries") {
              iconName = "Countries";
              icon = require("./assets/Images/state.png");
            } else if (route.name === "Regions") {
              iconName = "Regions";
              icon = require("./assets/Images/europe.png");
            }

            return (
              <Image
                source={icon}
                style={
                  (iconName = focused
                    ? { width: 32, height: 32, tintColor: "#e12806", top: 7 }
                    : { width: 32, height: 32, tintColor: "gray", top: 7 })
                }
              ></Image>
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ title: "" }}
          children={() => <HomeScreen />}
        />
        <Tab.Screen
          name="Countries"
          options={{ title: "" }}
          children={() => <CountriesScreen />}
        />
        <Tab.Screen
          name="Regions"
          options={{ title: "" }}
          children={() => <RegionsScreen />}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
