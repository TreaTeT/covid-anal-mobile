import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
  ScrollView,
  TextInput,
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
  // filter out 2 cruise ships that are listed in countries for some reason

  const filtered_data = props.data.data.filter(
    (item) =>
      item.country !== "Diamond Princess" && item.country !== "MS Zaandam"
  );

  const [modalDataHistorical, setModalDataHistorical] = useState({});
  const [modalDataGlobal, setModalDataGlobal] = useState({});
  const [modalVis, setModalVis] = useState(false);
  const [hasHistory, setHasHistory] = useState(false);
  const [countryFlag, setCountryFlag] = useState(
    "https://disease.sh/assets/img/flags/af.png"
  );
  const [selectData, setSelectData] = useState({
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
  const [displayGraph, setDisplayGraph] = useState(false);
  const [ready, setReady] = useState(false);
  const [query, setQuery] = useState("");
  const [fullData, setFullData] = useState(filtered_data);
  const [data, setData] = useState(filtered_data);
  const [autoFocus, setAutoFocus] = useState(true);

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

        setModalDataHistorical(historical);
        setHasHistory(true);
      })
      .catch((error) => {
        if (error.response.status == 404) {
          setHasHistory(false);
        }
      })
      .then(() => {
        setReady(true);
      });
  };

  function renderHeader() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          value={query}
          autoFocus={autoFocus}
          onChangeText={(queryText) => handleSearch(queryText)}
          placeholder="Search"
          style={styles.textInput}
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
          setModalVis(!modalVis);
          setHasHistory(false);
          setReady(false);
          setAutoFocus(true);
        }}
        isVisible={modalVis}
        style={{ margin: 0, padding: 0 }}
        propagateSwipe={true}
      >
        {/* MODAL CONTENT */}
        {ready ? (
          <ScrollView style={{ top: hp("20%") }}>
            <View
              style={
                hasHistory
                  ? displayGraph
                    ? styles.modalContainer
                    : [styles.modalContainer, { height: hp("190%") }]
                  : [styles.modalContainer, { height: hp("165%") }]
              }
            >
              <View style={{ flex: 1, flexDirection: "row" }}>
                <Image
                  source={{ uri: countryFlag }}
                  style={styles.flag}
                ></Image>
                <Text style={styles.country}>{modalDataGlobal.country}</Text>
              </View>

              <View style={styles.basicDataComponent}>
                <BasicDataComponent
                  cases={modalDataGlobal.cases}
                  deaths={modalDataGlobal.deaths}
                  recovered={modalDataGlobal.recovered}
                />
              </View>

              {hasHistory === true ? (
                <View>
                  <View
                    style={{
                      alignSelf: "center",
                      position: "absolute",
                      top: displayGraph ? hp("-60%") : hp("-50%"),
                    }}
                  >
                    <SelectComponent
                      today={() => {
                        setSelectData({
                          table: {
                            cases: modalDataGlobal.todayCases,
                            deaths: modalDataGlobal.todayDeaths,
                            recovered: modalDataGlobal.todayRecovered,
                          },
                        });
                        setDisplayGraph(false);
                      }}
                      week={() => {
                        setSelectData(modalDataHistorical.weekData);
                        setDisplayGraph(true);
                      }}
                      month={() => {
                        setSelectData(modalDataHistorical.monthData);
                        setDisplayGraph(true);
                      }}
                    />
                  </View>

                  <View
                    style={{
                      alignSelf: "center",
                      top: displayGraph ? hp("-50%") : hp("-40%"),
                    }}
                  >
                    <TableDataComponent
                      headline={"Affected people"}
                      row1={selectData.table.cases}
                      row2={selectData.table.deaths}
                      row3={selectData.table.recovered}
                    />
                  </View>

                  <View
                    style={{
                      alignSelf: "center",
                      top: displayGraph ? hp("-43%") : hp("-33%"),
                    }}
                  >
                    <AdditionalDataComponent data={modalDataGlobal} />
                  </View>

                  <View style={styles.graphsContainer}>
                    {displayGraph ? (
                      <View>
                        <Text style={styles.chartTitle}>Cases</Text>
                        <SingleChart
                          data={selectData.graph.cases}
                          color={"#04B83F"}
                        />
                        <Text style={styles.chartTitle}>Deaths</Text>
                        <SingleChart
                          data={selectData.graph.deaths}
                          color={"#F74141"}
                        />
                        <Text style={styles.chartTitle}>Cured</Text>
                        <SingleChart
                          data={selectData.graph.recovered}
                          color={"#3C89F1"}
                        />
                      </View>
                    ) : (
                      <View>
                        <Text>{"Unable to draw graphs for Today's data"}</Text>
                      </View>
                    )}
                  </View>
                </View>
              ) : (
                <View>
                  <View style={styles.tableDataComponent}>
                    <TableDataComponent
                      headline={"Today"}
                      row1={modalDataGlobal.todayCases}
                      row2={modalDataGlobal.todayDeaths}
                      row3={modalDataGlobal.todayRecovered}
                    />
                  </View>

                  <View style={styles.additionalDataComponent}>
                    <AdditionalDataComponent data={modalDataGlobal} />
                  </View>
                </View>
              )}
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
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
              setAutoFocus(false);
              setModalDataGlobal(item);
              setModalVis(!modalVis);
              setSelectData({
                table: {
                  cases: item.todayCases,
                  deaths: item.todayDeaths,
                  recovered: item.todayRecovered,
                },
              });

              setCountryFlag(item.countryInfo.flag);
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
  loadingContainer: {
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
  modalContainer: {
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
  chartTitle: {
    textAlign: "center",
    margin: wp("3%"),
    fontFamily: "RobotoLight",
    fontSize: wp("4.5%"),
    color: "#343434",
  },
  basicDataComponent: {
    alignSelf: "center",
    position: "absolute",
    top: hp("20%"),
  },
  textInputContainer: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
  },
  textInput: {
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
  },
  additionalDataComponent: {
    alignSelf: "center",
    top: hp("-25%"),
  },
  tableDataComponent: {
    alignSelf: "center",
    top: hp("-30%"),
  },
  graphsContainer: {
    alignSelf: "center",
    top: hp("-30%"),
  },
});

export default CountriesScreen;
