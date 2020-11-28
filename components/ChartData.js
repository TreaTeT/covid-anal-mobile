import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";

const ChartDataComponent = (props) => {
  const data = props.data;

  const [chart_data, set_chart_data] = useState(data[0]);
  const [focused, set_focused] = useState("cases");

  return (
    <View style={styles.container}>
      <View style={styles.headlineContainer}>
        <TouchableOpacity
          onPress={() => {
            set_focused("cases");
            set_chart_data(data[0]);
          }}
        >
          <View style={styles.headlineItemContainer}>
            <Text
              style={
                focused == "cases"
                  ? [styles.headlineItem, { color: "black" }]
                  : styles.headlineItem
              }
            >
              Cases
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            set_focused("deaths");
            set_chart_data(data[1]);
          }}
        >
          <View style={styles.headlineItemContainer}>
            <Text
              style={
                focused == "deaths"
                  ? [
                      styles.headlineItem,
                      {
                        color: "black",
                      },
                    ]
                  : styles.headlineItem
              }
            >
              Deaths
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            set_focused("cured");
            set_chart_data(data[2]);
          }}
        >
          <View style={styles.headlineItemContainer}>
            <Text
              style={
                focused == "cured"
                  ? [styles.headlineItem, { color: "black" }]
                  : styles.headlineItem
              }
            >
              Cured
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: "row" }}>
        {console.log(chart_data)}
        <YAxis
          data={chart_data}
          contentInset={{ top: wp("2%") }}
          svg={{
            fill: "#969696",
          }}
          formatLabel={(value) => {
            // ak value > 10 000 000 -> value 10m / 1m .tofixed(1)
            // ak value > 1 000 000 -> value 1m/1m .tofixed(2)
            // ak value > 100 000 -> value 100k / 1000 .tofixed(0)
            // ak value  > 10 000 -> value 10k / 1000 .tofixed(1)
            // ak value > 1000 -> value 1k / 1000 .tofixed(2)
            // ak value > 100 -> value 100  => allowed
            // console.log(value);

            //TODO: fix this to show by the comments above

            let res = Math.round((value / 1000000) * 10) / 10;
            return `${res.toFixed(1)}M`;
          }}
        />

        {/* TODO:try this charts https://www.npmjs.com/package/react-native-chart-kit*/}

        <LineChart
          style={{ height: hp("33%"), width: wp("76%") }}
          data={chart_data}
          contentInset={{ top: wp("2%") }}
          svg={{ stroke: "rgba(134, 65, 244)" }}
          animate={true}
          animationDuration={350}
        >
          <Grid />
        </LineChart>
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
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    width: wp("92%"),
    maxHeight: hp("50%"),
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  headlineContainer: {
    flex: 2,
    top: hp("-2.1%"),
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "center",
    width: wp("100%"),
    maxHeight: hp("7%"),

    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
  },
  headlineItem: {
    color: "#969696",
    fontFamily: "RobotoRegular",
    fontSize: hp("2.5%"),
    textAlign: "center",
    marginTop: hp("1.5%"),

    paddingBottom: 5,
  },
  headlineItemContainer: {
    width: wp("27.4%"),
    height: hp("6.5%"),
    borderBottomWidth: 1,
    borderColor: "#969696",
  },
});

export default ChartDataComponent;
