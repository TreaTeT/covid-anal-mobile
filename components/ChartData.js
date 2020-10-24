import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AreaChart, Grid } from "react-native-svg-charts";
import * as shape from "d3-shape";

const ChartData = (props) => {
  const data = props.data;

  const [chartData, setChartData] = useState(data[0]);
  const [focused, setFocused] = useState("cases");

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <TouchableOpacity
          onPress={() => {
            setFocused("cases");
            setChartData(data[0]);
          }}
        >
          <View
            style={
              focused === "cases"
                ? [
                    styles.headlineItemContainer,
                    { borderTopLeftRadius: 7, backgroundColor: "#666666" },
                  ]
                : [styles.headlineItemContainer, { borderTopLeftRadius: 7 }]
            }
          >
            <Text style={styles.headlineItem}>Cases</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFocused("deaths");
            setChartData(data[1]);
          }}
        >
          <View
            style={
              focused === "deaths"
                ? [
                    styles.headlineItemContainer,
                    {
                      borderColor: "#666666",
                      borderRightWidth: 2,
                      borderLeftWidth: 2,
                      backgroundColor: "#666666",
                    },
                  ]
                : [
                    styles.headlineItemContainer,
                    {
                      borderColor: "#666666",
                      borderRightWidth: 2,
                      borderLeftWidth: 2,
                    },
                  ]
            }
          >
            <Text style={styles.headlineItem}>Deaths</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setFocused("cured");
            setChartData(data[2]);
          }}
        >
          <View
            style={
              focused === "cured"
                ? [
                    styles.headlineItemContainer,
                    { borderTopRightRadius: 7, backgroundColor: "#666666" },
                  ]
                : [styles.headlineItemContainer, { borderTopRightRadius: 7 }]
            }
          >
            <Text style={styles.headlineItem}>Cured</Text>
          </View>
        </TouchableOpacity>
      </View>
      <AreaChart
        style={{ height: hp("26.2%"), width: wp("60%") }}
        data={chartData}
        contentInset={{ top: 30, bottom: 30 }}
        curve={shape.curveNatural}
        svg={{ fill: "rgba(134, 65, 244, 0.8)" }}
      >
        <Grid />
      </AreaChart>
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
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    width: wp("83%"),
    maxHeight: hp("33%"),
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  headlineContainer: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#888888",
    alignItems: "center",
    justifyContent: "center",
    width: wp("83%"),
    maxHeight: hp("7%"),
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },

  headlineItem: {
    color: "white",
    fontFamily: "Roboto-Regular",
    fontSize: hp("2.35%"),

    textAlign: "center",
    marginTop: hp("1.5%"),
  },
  headlineItemContainer: {
    width: wp("27.4%"),
    height: hp("6.5%"),
  },
});

export default ChartData;
