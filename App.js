import React from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen";
import RegionsScreen from "./screens/RegionsScreen";
import CountriesScreen from "./screens/CountriesScreen";
import { useFonts } from "@use-expo/font";
import { AppLoading } from "expo";

export default function App() {
  const [isLoaded] = useFonts({
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Black-Italic": require("./assets/fonts/Roboto-BlackItalic.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "Roboto-Bold-Italic": require("./assets/fonts/Roboto-BoldItalic.ttf"),
    "Roboto-Italic": require("./assets/fonts/Roboto-Italic.ttf"),
    "Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
    "Roboto-Light-Italic": require("./assets/fonts/Roboto-LightItalic.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Medium-Italic": require("./assets/fonts/Roboto-MediumItalic.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Thin": require("./assets/fonts/Roboto-Thin.ttf"),
    "Roboto-Thin-Italic": require("./assets/fonts/Roboto-ThinItalic.ttf"),
  });

  if (!isLoaded) {
    return <AppLoading />;
  } else {
    return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {
              let icon;
              let iconName;

              if (route.name === "Home") {
                iconName = "Home";
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
                      ? {
                          width: 32,
                          height: 32,
                          tintColor: "rgba(134, 65, 244, 0.8)",
                          top: 7,
                        }
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
}
