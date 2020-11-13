import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BasicDataComponent = (props) => {
  // format number from 165132 to 165,132
  let formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.basicDataText}>Coronavirus Cases</Text>
      <Text style={styles.basicDataNumber}>{formatNumber(props.cases)}</Text>
      <Text style={styles.basicDataText}>Deaths</Text>
      <Text style={[styles.basicDataNumber, { color: "#FF5733" }]}>
        {formatNumber(props.deaths)}
      </Text>
      <Text style={styles.basicDataText}>Recovered</Text>
      <Text style={[styles.basicDataNumber, { color: "#35cd2b" }]}>
        {formatNumber(props.recovered)}
      </Text>
    </View>
  );
};

BasicDataComponent.propTypes = {
  cases: PropTypes.number,
  deaths: PropTypes.number,
  recovered: PropTypes.number,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  basicDataText: {
    fontSize: wp("7.8%"),
    fontFamily: "RobotoThin",
  },
  basicDataNumber: {
    fontSize: wp("5.5s%"),
    padding: wp("1%"),
    paddingBottom: hp("3%"),
  },
});
export default BasicDataComponent;
