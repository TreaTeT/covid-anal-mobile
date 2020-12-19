import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import CountryItem from "../components/CountryItem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

function CountriesScreen(props) {
  return (
    <View style={styles.container}>
      <FlatList
        data={props.data.data}
        renderItem={({ item }) => (
          <CountryItem
            country={item.country}
            ab={item.countryInfo.iso2}
            id={item.countryInfo._id}
          />
        )}
        keyExtractor={(item) => item.countryInfo._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: wp("100%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CountriesScreen;
