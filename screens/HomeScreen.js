import React, { useEffect, useState } from "react";
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
  const [BDC_state, setBDC_state] = useState({});

  useEffect(() => {
    setBDC_state(({ cases, deaths, recovered } = props.data.global));
    // console.log(props.data);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.basicDataComponent}>
          <BasicDataComponent
            cases={BDC_state.cases}
            deaths={BDC_state.deaths}
            cured={BDC_state.recovered}
          />
        </View>

        <View style={styles.selectComponent}>
          <SelectComponent />
        </View>

        <View style={styles.tableDataComponent}>
          <TableDataComponent
            headline={"TOTAL"}
            row1={8746532}
            row2={87451}
            row3={6462}
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
