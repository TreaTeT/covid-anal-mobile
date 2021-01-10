import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BasicDataComponent = (props) => {
  // format number from 69420 -> 69,420
  let formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <View style={styles.container}>
      <View style={styles.itemContainer}>
        <Text style={styles.basicDataText}>Coronavirus Cases</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={require("../assets/Images/tick.png")}
            style={styles.itemIcon}
          ></Image>
          <Text style={[styles.basicDataNumber, { color: "#04B83F" }]}>
            {formatNumber(props.cases)}
          </Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.basicDataText}>Deaths</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={require("../assets/Images/skull.png")}
            style={styles.itemIcon}
          ></Image>
          <Text style={[styles.basicDataNumber, { color: "#F74141" }]}>
            {formatNumber(props.deaths)}
          </Text>
        </View>
      </View>

      <View style={styles.itemContainer}>
        <Text style={styles.basicDataText}>Recovered</Text>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <Image
            source={require("../assets/Images/heart.png")}
            style={styles.itemIcon}
          ></Image>
          <Text style={[styles.basicDataNumber, { color: "#3C89F1" }]}>
            {formatNumber(props.recovered)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  basicDataText: {
    fontSize: wp("5%"),
    fontFamily: "RobotoLight",
    marginLeft: wp("2%"),
    marginTop: wp("2%"),
    color: "#E6E6E6",
  },
  basicDataNumber: {
    fontSize: wp("8%"),
    marginLeft: wp("5%"),
    marginTop: wp("1%"),
    marginBottom: wp("2%"),
    fontFamily: "RobotoMedium",
  },
  itemContainer: {
    backgroundColor: "#394048",
    borderRadius: 10,
    width: wp("70%"),
    margin: wp("1.75%"),
  },
  itemIcon: {
    width: wp("8.5%"),
    height: wp("8.5%"),
    margin: wp("2%"),
  },
});
export default BasicDataComponent;
