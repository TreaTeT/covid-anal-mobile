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
export default function RegionsScreen() {
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <View style={styles.container}>
      {console.log(data)}
      <Text>{"This a Regions Screen"}</Text>

      {/* <BasicDataComponent
        cases={56468453}
        deaths={6844684}
        recovered={654654}
      />
      <SelectComponent /> */}
      <VictoryChart theme={VictoryTheme.material} width={350}>
        <VictoryLine
          style={{
            data: { stroke: "#c43a31" },
            parent: { border: "1px solid #ccc" },
          }}
          data={[
            {
              x: data[0],
              y: data[0],
            },
          ]}
        />
      </VictoryChart>

      <SelectComponent
        today={() => {
          console.log("today");
        }}
        week={() => {
          console.log("week");
        }}
        month={() => {
          console.log("month");
        }}
      />
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
