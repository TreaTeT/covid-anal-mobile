import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ChartData from "../components/ChartData";

export default function CountriesScreen() {
  return (
    <View style={styles.container}>
      <ChartData
        headline={"Yes please graph"}
        data={[
          [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80],
          [50, 10, 40, 95, 40, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80],
          [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 20, 80],
        ]}
      />
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
