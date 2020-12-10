import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BasicDataComponent from "../components/BasicData";
import SelectComponent from "../components/SelectComponent";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
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
import AdditionalDataComponent from "../components/AdditionalDataComponent";
export default function RegionsScreen() {
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const DATA = [
    {
      id: "10",
      title: "First Item",
    },
    {
      id: "150",
      title: "Second Item",
    },
    {
      id: "5149865",
      title: "Third Item",
    },
  ];

  return (
    <View style={styles.container}>
      {console.log(data)}
      <Text>{"This a Regions Screen"}</Text>
      <AdditionalDataComponent data={DATA} />
      <Text>There is something</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
