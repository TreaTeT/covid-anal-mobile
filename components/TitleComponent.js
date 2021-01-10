import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Title = (props) => {
  return (
    <View style={styles.titleView}>
      <Text style={styles.title}>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    margin: hp("4%"),
    fontSize: wp("6%"),
    alignSelf: "center",
    color: "#868686",
    fontFamily: "RobotoLight",
    position: "absolute",
  },
  titleView: {
    flex: 1,
    position: "absolute",
    backgroundColor: "white",
    width: wp("100%"),
    height: hp("20%"),
    top: 0,
  },
});

export default Title;
