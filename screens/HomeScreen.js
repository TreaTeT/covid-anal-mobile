import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import BasicDataComponent from "../components/BasicData";
import TableDataComponent from "../components/TableData";
import ChartDataComponent from "../components/ChartData";
import SelectComponent from "../components/SelectComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomeScreen(props) {
  const { global, historical } = props.data;
  const { todayCases, todayDeaths, todayRecovered } = global;
  const { cases, deaths, recovered } = global;

  // console.log(historical);
  // chart.js library
  // also need to find a way to generate graph from 0 to a certain value
  // or from a value to another value => prolly the best

  const todayData = {
    table: {
      cases: todayCases,
      deaths: todayDeaths,
      recovered: todayRecovered,
    },
    graph: {
      cases: todayCases,
      deaths: todayDeaths,
      recovered: todayRecovered,
    },
  };
  const weekData = {
    table: {
      cases:
        Object.values(historical.cases)[29] -
        Object.values(historical.cases)[22],
      deaths:
        Object.values(historical.deaths)[29] -
        Object.values(historical.deaths)[22],
      recovered:
        Object.values(historical.recovered)[29] -
        Object.values(historical.recovered)[22],
    },
    graph: {
      cases: Object.values(historical.cases).slice(22),
      deaths: Object.values(historical.deaths).slice(22),
      recovered: Object.values(historical.recovered).slice(22),
    },
  };

  const monthData = {
    table: {
      cases:
        Object.values(historical.cases)[29] -
        Object.values(historical.cases)[0],
      deaths:
        Object.values(historical.deaths)[29] -
        Object.values(historical.deaths)[0],
      recovered:
        Object.values(historical.recovered)[29] -
        Object.values(historical.recovered)[0],
    },
    graph: {
      cases: Object.values(historical.cases),
      deaths: Object.values(historical.deaths),
      recovered: Object.values(historical.recovered),
    },
  };

  const [select_data, setSelect_data] = useState(todayData);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.basicDataComponent}>
          <BasicDataComponent
            cases={cases}
            deaths={deaths}
            recovered={recovered}
          />
        </View>

        <View style={styles.selectComponent}>
          <SelectComponent
            today={() => {
              setSelect_data(todayData);
            }}
            week={() => {
              setSelect_data(weekData);
            }}
            month={() => {
              setSelect_data(monthData);
            }}
          />
        </View>

        <View style={styles.tableDataComponent}>
          <TableDataComponent
            headline={"TOTAL"}
            row1={select_data.table.cases}
            row2={select_data.table.deaths}
            row3={select_data.table.recovered}
          />
        </View>

        <View style={styles.chartDataComponent}>
          <ChartDataComponent
            data={[
              [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80],
              [50, 10, 40, 95, 40, 24, 85, 91, 35, 53, 53, 24, 50, 20, 80],
              [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, 20, 80],
            ]}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    height: hp("165%"),
    padding: 0,
    alignItems: "center",
  },
  basicDataComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("25%"),
  },
  selectComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("83%"),
  },
  tableDataComponent: {
    alignSelf: "center",
    top: hp("42%"),
  },
  chartDataComponent: {
    alignSelf: "center",
    top: hp("48%"),
  },
});
