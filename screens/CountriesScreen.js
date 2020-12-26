import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import CountryItem from "../components/CountryItem";
import BasicDataComponent from "../components/BasicData";
import SelectComponent from "../components/SelectComponent";
import TableDataComponent from "../components/TableData";
import AdditionalDataComponent from "../components/AdditionalDataComponent";
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
  const [has_history, set_has_history] = useState(true);
  const [country_flag, set_country_flag] = useState(
    "https://disease.sh/assets/img/flags/af.png"
  );

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

        set_modal_data_historical(historical);
        set_has_history(true);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          set_has_history(false);
        }
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
        propagateSwipe={true}
      >
        {/* MODAL CONTENT */}

        <ScrollView style={{ top: hp("20%") }}>
          <View style={styles.modal_container}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <Image source={{ uri: country_flag }} style={styles.flag}></Image>
              <Text style={styles.country}>{modal_data_global.country}</Text>
            </View>

            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                top: hp("20%"),
              }}
            >
              <BasicDataComponent
                cases={modal_data_global.cases}
                deaths={modal_data_global.deaths}
                recovered={modal_data_global.recovered}
              />
            </View>

            {has_history === true ? (
              <View
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  top: hp("60%"),
                }}
              >
                <Text>HAS HISTORY</Text>
              </View>
            ) : (
              <View>
                <View
                  style={{
                    alignSelf: "center",
                    top: hp("-30%"),
                  }}
                >
                  <TableDataComponent
                    headline={"Today"}
                    row1={modal_data_global.todayCases}
                    row2={modal_data_global.todayDeaths}
                    row3={modal_data_global.todayRecovered}
                  />
                </View>

                <View
                  style={{
                    alignSelf: "center",
                    top: hp("-25%"),
                  }}
                >
                  <AdditionalDataComponent data={modal_data_global} />
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* END OF MODAL CONTENT */}
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
              set_country_flag(item.countryInfo.flag);
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
    marginBottom: 0,
    marginHorizontal: 0,
    padding: 0,

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: hp("165%"),
    width: wp("100%"),
    bottom: 0,

    backgroundColor: "#fff",
  },
  flag: {
    width: wp("30%"),
    height: wp("20%"),
    marginTop: hp("5%"),
    marginLeft: wp("6%"),
    marginRight: wp("6%"),
    borderRadius: 5,
  },
  country: {
    fontFamily: "RobotoRegular",
    fontSize: wp("5.5%"),
    marginTop: hp("8.5%"),
    textAlign: "center",
  },
});

export default CountriesScreen;
