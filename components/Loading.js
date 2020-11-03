import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Loading() {
  return (
    <View styles={styles.container}>
      <Text style={styles.upperText}>{"COVID ANALYZER"}</Text>
      <Text style={styles.lowerText}>{"fetching data..."}</Text>
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
  upperText: {
    marginTop: hp("48%"),
    fontFamily: "RobotoRegular",
    fontSize: wp("5%"),
    color: "#363636",
    textAlign: "center",
  },
  lowerText: {
    fontFamily: "RobotoBlack",
    fontSize: wp("3.1%"),
    color: "#363636",
    textAlign: "center",
  },
});
