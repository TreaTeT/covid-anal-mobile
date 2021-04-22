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
        <View
          style={
            focused === "first"
              ? [styles.selectItem, { backgroundColor: "white" }]
              : styles.selectItem
          }
        >
          <Text
            style={
              focused === "first"
                ? [
                    styles.paragraph,
                    { fontFamily: "RobotoMedium", color: "#394048" },
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
        <View
          style={
            focused === "second"
              ? [styles.selectItem, { backgroundColor: "white" }]
              : styles.selectItem
          }
        >
          <Text
            style={
              focused === "second"
                ? [
                    styles.paragraph,
                    { fontFamily: "RobotoMedium", color: "#394048" },
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
        <View
          style={
            focused === "third"
              ? [styles.selectItem, { backgroundColor: "white" }]
              : styles.selectItem
          }
        >
          <Text
            style={
              focused === "third"
                ? [
                    styles.paragraph,
                    { fontFamily: "RobotoMedium", color: "#394048" },
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
    borderWidth: 2,
    borderColor: "#394048",
    alignSelf: "center",
    borderRadius: 7,
    height: hp("5.15%"),
    backgroundColor: "#394048",
  },
  paragraph: {
    textAlign: "center",
    fontSize: wp("3.5%"),
    // backgroundColor: "red",
    color: "white",
    fontFamily: "RobotoRegular",
    marginTop: wp("2.5%"),
  },
  selectItem: {
    flex: 1,
    alignContent: "space-around",
    width: wp("26%"),
    height: hp("4.7%"),
    backgroundColor: "#394048",
    marginBottom: 1,
    borderRadius: 5,
  },
});

export default SelectComponent;
