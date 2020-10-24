import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicDataComponent from "../components/BasicData";

export default function RegionsScreen() {
  return (
    <View style={styles.container}>
      <Text>{"This a Regions Screen"}</Text>
      <BasicDataComponent cases={"498435"} deaths={"216"} cured={"21584"} />
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
