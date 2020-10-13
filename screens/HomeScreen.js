import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TableData from "../components/TableData";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>{"This a HomeScreen"}</Text>
      <TableData headline={"Total"} row1={8746532} row2={87451} row3={6462} />
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
