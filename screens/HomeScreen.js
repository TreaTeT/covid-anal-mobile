import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import BasicDataComponent from "../components/BasicData";
import TableDataComponent from "../components/TableData";
import SelectComponent from "../components/SelectComponent";
import TitleComponent from "../components/TitleComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SingleChart from "../components/SingleChart";
import AdditionalDataComponent from "../components/AdditionalDataComponent";

export default function HomeScreen(props) {
  const { global, historical } = props.data;
  const { todayCases, todayDeaths, todayRecovered } = global;
  const { cases, deaths, recovered } = global;

  const today_data = {
    table: {
      cases: todayCases,
      deaths: todayDeaths,
      recovered: todayRecovered,
    },
    graph: {
      cases: [todayCases],
      deaths: todayDeaths,
      recovered: todayRecovered,
    },
  };

  const week_data = {
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

  const month_data = {
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

  const [select_data, set_select_data] = useState(today_data);
  const [display_graph, set_display_graph] = useState(false);
  return (
    <View>
      <TitleComponent title={"Statistics"} />

      <ScrollView style={{ marginTop: hp("10%") }}>
        <View
          style={
            display_graph
              ? styles.container
              : [styles.container, { height: hp("190%") }]
          }
        >
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
                set_select_data(today_data);
                set_display_graph(false);
              }}
              week={() => {
                set_select_data(week_data);
                set_display_graph(true);
              }}
              month={() => {
                set_select_data(month_data);
                set_display_graph(true);
              }}
            />
          </View>

          <View style={styles.tableDataComponent}>
            <TableDataComponent
              headline={"Affected people"}
              row1={select_data.table.cases}
              row2={select_data.table.deaths}
              row3={select_data.table.recovered}
            />
          </View>

          <View style={{ top: hp("42.5%") }}>
            <Text
              style={{
                textAlign: "center",
                fontSize: wp("4%"),
                fontFamily: "RobotoRegular",
              }}
            >
              {"Countries Affected"}
            </Text>
            <Text
              style={{
                textAlign: "center",
                fontSize: wp("5.5%"),
                fontFamily: "RobotoBlack",
                color: "#ff2626",
              }}
            >
              {global.affectedCountries}
            </Text>
          </View>

          <View style={styles.additionalDataComponent}>
            <AdditionalDataComponent data={global} />
          </View>

          <View style={styles.chartDataComponent}>
            {display_graph ? (
              <View>
                <Text style={styles.chart_title}>Cases</Text>
                <SingleChart data={select_data.graph.cases} color={"#04B83F"} />
                <Text style={styles.chart_title}>Deaths</Text>
                <SingleChart
                  data={select_data.graph.deaths}
                  color={"#F74141"}
                />
                <Text style={styles.chart_title}>Cured</Text>
                <SingleChart
                  data={select_data.graph.recovered}
                  color={"#3C89F1"}
                />
              </View>
            ) : (
              <View>
                <Text>{"There is no graph"}</Text>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
    justifyContent: "center",
    height: hp("315%"),
    padding: 0,
    alignItems: "center",
  },
  basicDataComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("15%"),
  },
  selectComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("73%"),
  },
  tableDataComponent: {
    alignSelf: "center",
    top: hp("38%"),
  },
  chartDataComponent: {
    alignSelf: "center",
    top: hp("50%"),
  },
  chart_title: {
    textAlign: "center",
    margin: wp("3%"),
    fontFamily: "RobotoLight",
    fontSize: wp("4.5%"),
    color: "#343434",
  },
  additionalDataComponent: {
    top: hp("45%"),
  },
});
