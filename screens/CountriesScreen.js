import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
  Keyboard,
} from "react-native";
import CountryItem from "../components/CountryItem";
import BasicDataComponent from "../components/BasicData";
import SelectComponent from "../components/SelectComponent";
import TableDataComponent from "../components/TableData";
import AdditionalDataComponent from "../components/AdditionalDataComponent";
import SingleChart from "../components/SingleChart";
import Loading from "../components/Loading";
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
  const [has_history, set_has_history] = useState(false);
  const [country_flag, set_country_flag] = useState(
    "https://disease.sh/assets/img/flags/af.png"
  );

  const [select_data, set_select_data] = useState({
    table: {
      cases: 0,
      deaths: 0,
      recovered: 0,
    },
    graph: {
      cases: [0, 0, 0],
      deaths: [0, 0, 0],
      recovered: [0, 0, 0],
    },
  });
  const [display_graph, set_display_graph] = useState(false);
  const [ready, set_ready] = useState(false);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState(filtered_data);
  const [data, setData] = useState(filtered_data);
  const [auto_focus, set_auto_focus] = useState(true);

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
      .then(() => {
        set_ready(true);
      });
  };

  function renderHeader() {
    return (
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          marginVertical: 10,
          borderRadius: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          autoFocus={auto_focus}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={{
            backgroundColor: "#fff",
            paddingHorizontal: wp("5%"),
            paddingVertical: hp("1.3%"),
            marginTop: hp("1%"),
            borderWidth: 1,
            borderColor: "#f9f9f9",
            borderRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,

            elevation: 1,
          }}
        />
      </View>
    );
  }

  const handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const filteredData = fullData.filter((item) => {
      return contains(item, formattedQuery);
    });
    setData(filteredData);
    setQuery(text);
  };

  const contains = ({ country }, query) => {
    let c = country.toLowerCase();
    if (c.startsWith(query)) {
      return true;
    }

    return false;
  };
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        onBackdropPress={() => {
          set_modal_vis(!modal_vis);
          set_has_history(false);
          set_ready(false);
          set_auto_focus(true);
        }}
        isVisible={modal_vis}
        style={{ margin: 0, padding: 0 }}
        propagateSwipe={true}
      >
        {/* MODAL CONTENT */}
        {ready ? (
          <ScrollView style={{ top: hp("20%") }}>
            <View
              style={
                has_history
                  ? display_graph
                    ? styles.modal_container
                    : [styles.modal_container, { height: hp("190%") }]
                  : [styles.modal_container, { height: hp("165%") }]
              }
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={{ uri: country_flag }}
                  style={styles.flag}
                ></Image>
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
                <View>
                  <View
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      top: display_graph ? hp("-60%") : hp("-50%"),
                    }}
                  >
                    <SelectComponent
                      today={() => {
                        set_select_data({
                          table: {
                            cases: modal_data_global.todayCases,
                            deaths: modal_data_global.todayDeaths,
                            recovered: modal_data_global.todayRecovered,
                          },
                        });
                        set_display_graph(false);
                      }}
                      week={() => {
                        set_select_data(modal_data_historical.weekData);
                        set_display_graph(true);
                      }}
                      month={() => {
                        set_select_data(modal_data_historical.monthData);
                        set_display_graph(true);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      alignSelf: "center",

                      top: display_graph ? hp("-50%") : hp("-40%"),
                    }}
                  >
                    <TableDataComponent
                      headline={"Affected people"}
                      row1={select_data.table.cases}
                      row2={select_data.table.deaths}
                      row3={select_data.table.recovered}
                    />
                  </View>

                  <View
                    style={{
                      alignSelf: "center",
                      top: display_graph ? hp("-43%") : hp("-33%"),
                    }}
                  >
                    <AdditionalDataComponent data={modal_data_global} />
                  </View>

                  <View style={{ alignSelf: "center", top: hp("-30%") }}>
                    {display_graph ? (
                      <View>
                        <Text style={styles.chart_title}>Cases</Text>
                        <SingleChart
                          data={select_data.graph.cases}
                          color={"#04B83F"}
                        />
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
        ) : (
          <View style={styles.loading_container}>
            <Loading />
          </View>
        )}

        {/* END OF MODAL CONTENT */}
      </Modal>
      <FlatList
        data={data}
        initialNumToRender={15}
        maxToRenderPerBatch={7}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <CountryItem
            country={item.country}
            ab={item.countryInfo.iso2}
            id={item.countryInfo._id}
            data={item}
            onPress={() => {
              set_auto_focus(false);
              set_modal_data_global(item);
              set_modal_vis(!modal_vis);
              set_select_data({
                table: {
                  cases: item.todayCases,
                  deaths: item.todayDeaths,
                  recovered: item.todayRecovered,
                },
              });

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
  loading_container: {
    marginBottom: 0,
    marginHorizontal: 0,

    marginTop: hp("20 %"),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: hp("80%"),
    width: wp("100%"),
    bottom: 0,

    backgroundColor: "#fff",
  },
  modal_container: {
    marginBottom: 0,

    marginHorizontal: 0,
    padding: 0,

    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    height: hp("330%"),
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
  chart_title: {
    textAlign: "center",
    margin: wp("3%"),
    fontFamily: "RobotoLight",
    fontSize: wp("4.5%"),
    color: "#343434",
  },
});

export default CountriesScreen;
