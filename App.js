import React, { useState, useEffect } from "react";
import { Image, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

import HomeScreen from "./screens/HomeScreen";
import RegionsScreen from "./screens/RegionsScreen";
import CountriesScreen from "./screens/CountriesScreen";
import { useFonts } from "@use-expo/font";
import Loading from "./components/Loading";

const axios = require("axios");

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [HS_data, setHS_data] = useState({ data: "data" });
  const [CS_data, setCS_data] = useState([]);
  const [RS_data, setRS_data] = useState([]);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    // axios
    //   .get("https://disease.sh/v3/covid-19/all")
    //   .then((response) => {
    //     setHS_data({ global: response.data, historical: "yes yes" });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })
    //   .then(() => {
    //     setLoaded(true);
    //   });
    axios
      .all([
        axios.get("https://disease.sh/v3/covid-19/all", {}),
        axios.get("https://disease.sh/v3/covid-19/historical/all", {}),
        axios.get("https://disease.sh/v3/covid-19/countries", {}),
        axios.get("https://disease.sh/v3/covid-19/continents", {}),
      ])
      .then(
        axios.spread((data1, data2, data3, data4) => {
          setHS_data({
            global: data1.data,
            historical: data2.data,
          });

          setCS_data(data3);
          setRS_data({ countries: data3, continents: data4 });
          setLoaded(true);
        })
      )
      .catch((errors) => {
        setErrorLoading(true);
        console.log(errors);
      })
      .then(() => {});
  }, []);

  /*
    Axios calls    
    - [x] request for current global data [app]
    - [] request for historical data [app]
    
    - [] request for countries [app]
    - [] request for country historical [countries]
    
    - [] request for regions (continental) [app]
    - [] custom request for countries user chooses [regions]
  */
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
            children={() => <HomeScreen data={HS_data} />}
          />
          <Tab.Screen
            name="Countries"
            options={{ title: "" }}
            children={() => <CountriesScreen data={CS_data} />}
          />
          <Tab.Screen
            name="Regions"
            options={{ title: "" }}
            children={() => <RegionsScreen data={RS_data} />}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}
