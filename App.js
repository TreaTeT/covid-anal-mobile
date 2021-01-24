import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import RegionsScreen from "./screens/RegionsScreen";
import CountriesScreen from "./screens/CountriesScreen";
import { useFonts } from "@use-expo/font";
import Loading from "./components/Loading";

const axios = require("axios");
const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded, setLoaded] = useState(false);
  // data for screens
  const [HSData, setHSData] = useState({});
  const [CSData, setCSData] = useState([]);
  const [RSData, setRSData] = useState([]);
  // error while intial loading
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    axios
      .all([
        axios.get("https://disease.sh/v3/covid-19/all", {}),
        axios.get("https://disease.sh/v3/covid-19/historical/all", {}),
        axios.get("https://disease.sh/v3/covid-19/countries", {}),
        axios.get("https://disease.sh/v3/covid-19/continents", {}),
      ])
      .then(
        axios.spread((data1, data2, data3, data4) => {
          setHSData({
            global: data1.data,
            historical: data2.data,
          });

          setCSData(data3);
          setRSData({ countries: data3, continents: data4 });
          setLoaded(true);
        })
      )
      .catch((errors) => {
        setErrorLoading(true);
        console.log(errors);
      });
  }, []);

  // FONT LOADING
  const [isLoaded] = useFonts({
    RobotoBlack: require("./assets/fonts/RobotoBlack.ttf"),
    RobotoBlackItalic: require("./assets/fonts/RobotoBlackItalic.ttf"),
    RobotoBold: require("./assets/fonts/RobotoBold.ttf"),
    RobotoBoldItalic: require("./assets/fonts/RobotoBoldItalic.ttf"),
    RobotoItalic: require("./assets/fonts/RobotoItalic.ttf"),
    RobotoLight: require("./assets/fonts/RobotoLight.ttf"),
    RobotoLightItalic: require("./assets/fonts/RobotoLightItalic.ttf"),
    RobotoMedium: require("./assets/fonts/RobotoMedium.ttf"),
    RobotoMediumItalic: require("./assets/fonts/RobotoMediumItalic.ttf"),
    RobotoRegular: require("./assets/fonts/RobotoRegular.ttf"),
    RobotoThin: require("./assets/fonts/RobotoThin.ttf"),
    RobotoThinItalic: require("./assets/fonts/RobotoThinItalic.ttf"),
  });

  // if something wrong happened during loading
  if (loaded == false || !isLoaded) {
    return <Loading errorLoading={errorLoading} />;
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
                          tintColor: "rgba(15, 140, 250 , 0.8)",
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
            children={() => <HomeScreen data={HSData} />}
          />
          <Tab.Screen
            name="Countries"
            options={{ title: "" }}
            children={() => <CountriesScreen data={CSData} />}
          />
          <Tab.Screen
            name="Regions"
            options={{ title: "" }}
            children={() => <RegionsScreen data={RSData} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
