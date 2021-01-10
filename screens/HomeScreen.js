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

  const [selectData, setSelectData] = useState(todayData);
  const [displayGraph, setDisplayGraph] = useState(false);

  return (
    <View>
      <TitleComponent title={"Statistics"} />

      <ScrollView style={styles.scrollview}>
        <View
          style={
            displayGraph
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
                setSelectData(todayData);
                setDisplayGraph(false);
              }}
              week={() => {
                setSelectData(weekData);
                setDisplayGraph(true);
              }}
              month={() => {
                setSelectData(monthData);
                setDisplayGraph(true);
              }}
            />
          </View>

          <View style={styles.tableDataComponent}>
            <TableDataComponent
              headline={"Affected people"}
              row1={selectData.table.cases}
              row2={selectData.table.deaths}
              row3={selectData.table.recovered}
            />
          </View>

          <View style={{ top: hp("42.5%") }}>
            <Text style={styles.countriesAffectedHeadline}>
              {"Countries Affected"}
            </Text>
            <Text style={styles.countriesAffectedNumber}>
              {global.affectedCountries}
            </Text>
          </View>

          <View style={styles.additionalDataComponent}>
            <AdditionalDataComponent data={global} />
          </View>

          <View style={styles.chartDataComponent}>
            {displayGraph ? (
              <View>
                <Text style={styles.chartTitle}>Cases</Text>
                <SingleChart data={selectData.graph.cases} color={"#04B83F"} />
                <Text style={styles.chartTitle}>Deaths</Text>
                <SingleChart data={selectData.graph.deaths} color={"#F74141"} />
                <Text style={styles.chartTitle}>Cured</Text>
                <SingleChart
                  data={selectData.graph.recovered}
                  color={"#3C89F1"}
                />
              </View>
            ) : (
              <View>
                <Text style={styles.graphsWarning}>
                  {"Unable to draw graphs for Today's data"}
                </Text>
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
  chartTitle: {
    textAlign: "center",
    margin: wp("3%"),
    fontFamily: "RobotoLight",
    fontSize: wp("4.5%"),
    color: "#343434",
  },
  additionalDataComponent: {
    top: hp("45%"),
  },
  countriesAffectedHeadline: {
    textAlign: "center",
    fontSize: wp("4%"),
    fontFamily: "RobotoRegular",
  },
  countriesAffectedNumber: {
    textAlign: "center",
    fontSize: wp("5.5%"),
    fontFamily: "RobotoBlack",
    color: "#ff2626",
  },
  graphsWarning: {
    fontFamily: "RobotoItalic",
    fontSize: wp("3%"),
  },
  scrollview: {
    marginTop: hp("10%"),
  },
});
