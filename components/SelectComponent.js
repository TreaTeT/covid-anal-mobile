import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const SelectComponent = (props) => {
  const [focused, setFocused] = useState("first"); // first, second , third

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => {
          setFocused("first");
          props.today();
        }}
      >
        <View style={[styles.selectItem, { borderRightWidth: 1 }]}>
          <Text
            style={
              focused === "first"
                ? [
                    styles.paragraph,
                    { fontFamily: "RobotoMedium", color: "black" },
                  ]
                : styles.paragraph
            }
          >
            {"Today"}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          setFocused("second");
          props.week();
        }}
      >
        <View style={styles.selectItem}>
          <Text
            style={
              focused === "second"
                ? [
                    styles.paragraph,
                    { fontFamily: "RobotoMedium", color: "black" },
                  ]
                : styles.paragraph
            }
          >
            {"L. Week"}
          </Text>
        </View>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback
        onPress={() => {
          setFocused("third");
          props.month();
        }}
      >
        <View style={[styles.selectItem, { borderLeftWidth: 1 }]}>
          <Text
            style={
              focused === "third"
                ? [
                    styles.paragraph,
                    { fontFamily: "RobotoMedium", color: "black" },
                  ]
                : styles.paragraph
            }
          >
            {"L. Month"}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: wp("80%"),
    flexDirection: "row",
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 5,
    height: hp("3.7%"),
  },
  paragraph: {
    textAlign: "center",
    fontSize: wp("4.2%"),
    color: "#969696",
    fontFamily: "RobotoRegular",
  },
  selectItem: {
    width: wp("26.67%"),
    height: hp("3.5%"),
    textAlignVertical: "center",
  },
});

export default SelectComponent;
