import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import BasicDataComponent from "../components/BasicData";
import TableDataComponent from "../components/TableData";
import ChartDataComponent from "../components/ChartData";
import SelectComponent from "../components/SelectComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            top: hp("25%"),
          }}
        >
          <BasicDataComponent cases="8465351" deaths="4685" cured="564686" />
        </View>

        <View
          style={{
            alignSelf: "center",
            position: "absolute",
            top: hp("83%"),
          }}
        >
          <SelectComponent />
        </View>

        <View
          style={{
            alignSelf: "center",
            top: hp("42%"),
          }}
        >
          <TableDataComponent
            headline={"TOTAL"}
            row1={8746532}
            row2={87451}
            row3={6462}
          />
        </View>

        <View
          style={{
            alignSelf: "center",
            top: hp("48%"),
          }}
        >
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
});
