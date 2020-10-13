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
      <Text style={styles.basicDataText}>Deaths</Text>
      <Text style={styles.basicDataText}>Recovered</Text>
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
    fontWeight: "100",
  },
});
export default BasicDataComponent;
