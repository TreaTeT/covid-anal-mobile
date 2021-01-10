import React from "react";
import { StyleSheet, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";

const SingleChart = (props) => {
  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={wp("88%")}
        height={hp("36%")}
      >
        <VictoryLine
          style={{
            data: { stroke: `${props.color}` },
            parent: { border: "1px solid #ccc" },
          }}
          data={props.data}
        />
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => {
            if (x > 999999) {
              return `${x / 1000000}M`;
            } else if (x <= 999999 && x > 999) {
              return `${x / 1000}k`;
            } else if (x < 999) {
              return `${x}`;
            }
          }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    margin: 5,
  },
});

export default SingleChart;
