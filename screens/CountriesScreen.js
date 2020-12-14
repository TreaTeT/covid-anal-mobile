import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ChartDataComponent from "../components/ChartData";
import CountryItem from "../components/CountryItem";

function CountriesScreen() {
  return (
    <View style={styles.container}>
      <CountryItem />
    </View>
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

export default CountriesScreen;
