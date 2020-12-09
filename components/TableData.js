import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const TableDataComponent = (props) => {
  let formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <Text style={styles.headline}>{props.headline}</Text>
      </View>

      <View style={styles.dataRow}>
        <View style={{ flex: 1, paddingLeft: wp("4%") }}>
          <Text style={styles.dataNames}>{"Cases:"}</Text>
        </View>

        <View style={{ paddingRight: wp("4%") }}>
          <Text style={styles.dataNumbers}>{formatNumber(props.row1)}</Text>
        </View>
      </View>

      <View style={styles.dataRow}>
        <View style={{ flex: 1, paddingLeft: wp("4%") }}>
          <Text style={styles.dataNames}>{"Deaths:"}</Text>
        </View>
        <View style={{ paddingRight: wp("4%") }}>
          <Text style={styles.dataNumbers}>{formatNumber(props.row2)}</Text>
        </View>
      </View>

      <View style={styles.dataRow}>
        <View style={{ flex: 1, paddingLeft: wp("4%") }}>
          <Text style={styles.dataNames}>{"Cured:"}</Text>
        </View>
        <View style={{ paddingRight: wp("4%") }}>
          <Text style={styles.dataNumbers}>{formatNumber(props.row3)}</Text>
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    width: wp("80%"),
    maxHeight: hp("28%"),
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  headlineContainer: {
    flex: 2,
    backgroundColor: "#394048",
    alignItems: "center",
    justifyContent: "center",
    width: wp("80%"),
    maxHeight: hp("7%"),
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },

  headline: {
    fontFamily: "RobotoRegular",
    color: "white",
    fontSize: hp("2.3%"),
  },
  dataRow: {
    flex: 1,
    margin: hp("1.80%"),
    //padding: hp("1.55%"),
    flexDirection: "row",
  },
  dataNames: {
    fontFamily: "RobotoRegular",
    fontSize: hp("2.4%"),
    color: "#49494a",
  },
  dataNumbers: {
    fontFamily: "RobotoMedium",
    fontSize: hp("2.45%"),
    color: "#49494a",
  },
});

export default TableDataComponent;
