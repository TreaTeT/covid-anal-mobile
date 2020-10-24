import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const BasicDataComponent = (props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.basicDataText}>Coronavirus Cases</Text>
      <Text style={styles.basicDataNumber}>{props.cases}</Text>
      <Text style={styles.basicDataText}>Deaths</Text>
      <Text style={[styles.basicDataNumber, { color: "#FF5733" }]}>
        {props.deaths}
      </Text>
      <Text style={styles.basicDataText}>Recovered</Text>
      <Text style={[styles.basicDataNumber, { color: "#35cd2b" }]}>
        {props.cured}
      </Text>
    </View>
  );
};

BasicDataComponent.propTypes = {
  cases: PropTypes.string,
  deaths: PropTypes.string,
  cured: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  basicDataText: {
    fontSize: wp("7%"),

    fontFamily: "Roboto-Thin",
  },
  basicDataNumber: {
    fontSize: wp("5%"),
    padding: wp("1.25%"),
    paddingBottom: hp("2.5%"),
  },
});
export default BasicDataComponent;
