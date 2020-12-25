import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import CountryItem from "../components/CountryItem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
const axios = require("axios");

function CountriesScreen(props) {
  const filtered_data = props.data.data.filter(
    (item) =>
      item.country !== "Diamond Princess" && item.country !== "MS Zaandam"
  );
  const [modal_data_historical, set_modal_data_historical] = useState({});
  const [modal_data_global, set_modal_data_global] = useState({});
  const [modal_vis, set_modal_vis] = useState(false);

  const getHistoricalData = (iso2) => {
    let link = `https://disease.sh/v3/covid-19/historical/${iso2}`;

    axios
      .get(link)
      .then((response) => {
        let cases = response.data.timeline.cases;
        let deaths = response.data.timeline.deaths;
        let recovered = response.data.timeline.recovered;

        let historical = {
          monthData: {
            table: {
              cases: Object.values(cases)[29] - Object.values(cases)[0],
              deaths: Object.values(deaths)[29] - Object.values(deaths)[0],
              recovered:
                Object.values(recovered)[29] - Object.values(recovered)[0],
            },
            graph: {
              cases: Object.values(cases),
              deaths: Object.values(deaths),
              recovered: Object.values(recovered),
            },
          },
          weekData: {
            table: {
              cases: Object.values(cases)[29] - Object.values(cases)[22],
              deaths: Object.values(deaths)[29] - Object.values(deaths)[22],
              recovered:
                Object.values(recovered)[29] - Object.values(recovered)[22],
            },
            graph: {
              cases: Object.values(cases).slice(22),
              deaths: Object.values(deaths).slice(22),
              recovered: Object.values(recovered).slice(22),
            },
          },
        };
        console.log(historical);
        set_modal_data_historical(historical);
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {});
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        onBackdropPress={() => {
          set_modal_vis(!modal_vis);
        }}
        isVisible={modal_vis}
        style={{ margin: 0, padding: 0 }}
      >
        <View style={styles.modal_container}>
          <Text
            style={{
              fontFamily: "RobotoLight",
              fontSize: wp("4%"),
              textAlign: "center",
            }}
          >
            {modal_data_global.country}
          </Text>
        </View>
      </Modal>
      <FlatList
        data={filtered_data}
        initialNumToRender={15}
        maxToRenderPerBatch={7}
        renderItem={({ item }) => (
          <CountryItem
            country={item.country}
            ab={item.countryInfo.iso2}
            id={item.countryInfo._id}
            data={item}
            onPress={() => {
              set_modal_data_global(item);
              set_modal_vis(!modal_vis);
              console.log(item);
              getHistoricalData(item.countryInfo.iso2);
            }}
          />
        )}
        keyExtractor={(item) => item.countryInfo._id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp("100%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
  },
  modal_container: {
    margin: 0,
    padding: 0,

    backgroundColor: "#f2f2f2",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: hp("60%"),
    width: wp("100%"),
    bottom: 0,
    position: "absolute",
  },
});

export default CountriesScreen;
