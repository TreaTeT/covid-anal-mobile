import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Loading(props) {
  return (
    <View styles={styles.container}>
      <Text style={styles.upperText}>{"COVID ANALYZER"}</Text>

      {!props.errorLoading ? (
        <Text style={styles.lowerText}>{"fetching data..."}</Text>
      ) : (
        <View>
          <Text style={styles.lowerText}>{`Something's not right...`}</Text>
          <Text
            style={styles.lowerText}
          >{`please check your internet connection`}</Text>
        </View>
      )}
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
    fontSize: wp("5%"),
    color: "#363636",
    textAlign: "center",
  },
  lowerText: {
    fontSize: wp("3.1%"),
    color: "#363636",
    textAlign: "center",
  },
});
