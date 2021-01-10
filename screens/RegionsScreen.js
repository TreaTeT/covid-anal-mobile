import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  ScrollView,
  FlatList,
  TextInput,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RNPickerSelect from "react-native-picker-select";
import Modal from "react-native-modal";
import BasicDataComponent from "../components/BasicData";
import TableDataComponent from "../components/TableData";
import AdditionalDataComponent from "../components/AdditionalDataComponent";
import DialogInput from "react-native-dialog-input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TitleComponent from "../components/TitleComponent";

export default function RegionsScreen(props) {
  let { countries, continents } = props.data;
  let pickerItems = continents.data.map((item) => {
    return {
      label: `${item.continent}`,
      value: `${item.continent}`,
      key: `${item.continent}`,
    };
  });

  pickerItems.push({ label: "Custom region", value: "custom", key: "custom" });

  const [select_value, set_select_value] = useState("Europe");
  const [modal_data, set_modal_data] = useState({});
  const [modal_vis, set_modal_vis] = useState(false);
  const [countries_modal_vis, set_countries_modal_vis] = useState(false);
  const [picked_countries, set_picked_countries] = useState([]);

  const filtered_data = countries.data.filter(
    (item) =>
      item.country !== "Diamond Princess" && item.country !== "MS Zaandam"
  );
  const [countries_data, set_countries_data] = useState(filtered_data);
  const [query, setQuery] = useState("");

  const [fullData, setFullData] = useState(filtered_data);

  const [dialog_vis, set_dialog_vis] = useState(false);
  const [keys, set_keys] = useState([]);
  const [current_key, set_current_key] = useState("");
  const [check, set_check] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);

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
          autoFocus={autoFocus}
          onChangeText={(queryText) => {
            handleSearch(queryText);
            setAutoFocus(true);
          }}
          placeholder="Search"
          keyboardAppearance={"dark"}
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

    set_countries_data(filteredData);
    setQuery(text);
  };

  const contains = ({ country }, query) => {
    let c = country.toLowerCase();
    if (c.startsWith(query)) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    getKeys();
  }, []);

  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value !== null) {
        set_modal_data(JSON.parse(value));
        set_modal_vis(!modal_vis);
        getKeys();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeData = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      getKeys();
    } catch (e) {
      console.log(e);
    }
    console.log("removed");
  };

  // place for function to get all the keys

  const getKeys = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      keys = keys.map((item) => {
        return { save: item };
      });
      set_keys(keys);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <TitleComponent title={"Regions"} />
      {/* MODAL FOR SHOWING DATA CONTENT */}
      <Modal
        onBackdropPress={() => {
          set_modal_vis(!modal_vis);
          set_current_key("");
        }}
        isVisible={modal_vis}
        style={{ margin: 0, padding: 0 }}
        propagateSwipe={true}
        animationOutTiming={500}
        animationInTiming={500}
      >
        <ScrollView style={{ top: hp("20%") }}>
          <View style={styles.modal_container}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text style={styles.header}>
                {modal_data.continent
                  ? modal_data.continent
                  : current_key.length > 0
                  ? current_key
                  : "Custom region"}
              </Text>
              {current_key.length === 0 ? (
                <View style={{ width: wp("17%"), margin: wp("3%") }}>
                  <Button
                    onPress={() => {
                      set_dialog_vis(!dialog_vis);
                    }}
                    title={"save"}
                  ></Button>
                </View>
              ) : (
                <View></View>
              )}
            </View>

            {/* DIALOG */}

            <DialogInput
              isDialogVisible={dialog_vis}
              title={"Save Region"}
              message={"Please enter a name for your custom region."}
              hintInput={"save1"}
              submitInput={(inputText) => {
                storeData(inputText, modal_data);
                getData(inputText);
                set_dialog_vis(!dialog_vis);
                set_modal_vis(!modal_vis);
                set_countries_modal_vis(!countries_modal_vis);
              }}
              closeDialog={() => {
                getData("a");
                set_dialog_vis(!dialog_vis);
              }}
            ></DialogInput>

            {/* DIALOG */}
            <View
              style={{
                alignSelf: "center",
                position: "absolute",
                top: hp("20%"),
              }}
            >
              <BasicDataComponent
                cases={modal_data.cases}
                deaths={modal_data.deaths}
                recovered={modal_data.recovered}
              />
            </View>

            <View>
              <View
                style={{
                  alignSelf: "center",
                  top: hp("-30%"),
                }}
              >
                <TableDataComponent
                  headline={"Today"}
                  row1={modal_data.todayCases}
                  row2={modal_data.todayDeaths}
                  row3={modal_data.todayRecovered}
                />
              </View>

              <View
                style={{
                  alignSelf: "center",
                  top: hp("-25%"),
                }}
              >
                <AdditionalDataComponent data={modal_data} />
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>

      {/* COUNTRIES MODAL CONTENT */}
      <Modal
        onBackdropPress={() => {
          set_countries_modal_vis(!countries_modal_vis);
        }}
        isVisible={countries_modal_vis}
        style={{ margin: 0, padding: 0 }}
        propagateSwipe={true}
        animationOutTiming={1000}
        animationInTiming={1000}
        onModalHide={() => {
          if (check) {
            set_modal_vis(true);
            set_check(false);
          } else {
            console.log("bazinga");
          }
        }}
      >
        <View style={styles.countries_modal_container}>
          <View style={{ flex: 1, top: hp("-5%") }}>
            <Text
              style={[styles.header, { fontSize: wp("6.5%") }]}
            >{`Pick countries`}</Text>
          </View>
          <View style={{ margin: 10, height: hp("46%") }}>
            <FlatList
              data={countries_data}
              initialNumToRender={15}
              maxToRenderPerBatch={7}
              ListHeaderComponent={renderHeader}
              renderItem={({ item }) => {
                return (
                  <Text
                    style={{
                      padding: 3,
                      fontFamily: picked_countries.includes(item.country)
                        ? "RobotoMedium"
                        : "RobotoLight",
                      fontSize: wp("5.5%"),
                      color: picked_countries.includes(item.country)
                        ? "#2196F3"
                        : "#3d3a3a",
                    }}
                    onPress={() => {
                      setAutoFocus(false);
                      if (picked_countries.includes(item.country)) {
                        set_picked_countries(
                          picked_countries.filter(
                            (country) => country != item.country
                          )
                        );
                      } else {
                        set_picked_countries([
                          ...picked_countries,
                          item.country,
                        ]);
                      }
                    }}
                  >
                    {item.country}
                  </Text>
                );
              }}
              keyExtractor={(item) => item.country}
            />
          </View>
          <View
            style={{
              width: wp("20%"),
              alignSelf: "center",
              marginBottom: hp("0.5%"),
              padding: Platform.OS === "ios" ? 10 : 0,
            }}
          >
            <Button
              onPress={() => {
                if (picked_countries.length > 0) {
                  let temp = {
                    cases: 0,
                    deaths: 0,
                    recovered: 0,
                    todayCases: 0,
                    todayDeaths: 0,
                    todayRecovered: 0,
                    active: 0,
                    critical: 0,
                    tests: 0,
                    population: 0,
                  };
                  picked_countries.forEach((country) => {
                    let c = countries.data.filter(
                      (item) => item.country == country
                    );

                    for (const property in temp) {
                      temp[property] += parseInt(c[0][property]);
                    }
                  });
                  set_countries_modal_vis(false);
                  set_modal_data(temp);
                  // set_modal_vis(true);
                  set_picked_countries([]);
                  setQuery("");
                  set_check(true);

                  console.log("button pressed");
                } else {
                  console.log("did not picked any countries");
                }
              }}
              title={"go"}
            ></Button>
          </View>
        </View>
      </Modal>

      <View
        style={{
          borderWidth: 1,
          width: wp("80%"),
          borderColor: "#394048",
          borderRadius: 5,
          padding: Platform.OS === "ios" ? 10 : 7,
        }}
      >
        <RNPickerSelect
          style={{ width: wp("80%") }}
          itemKey={select_value}
          useNativeAndroidPickerStyle={false}
          onValueChange={(value) => {
            if (value === "custom") {
              set_select_value(value);
            } else {
              set_select_value(value);
              let mdata = continents.data.filter(
                (item) => item.continent == value
              );
              set_modal_data(mdata[0]);
            }
          }}
          items={pickerItems}
        />
      </View>
      <View
        style={{
          margin: wp("5%"),
          borderRadius: 5,
          width: Platform.OS === "ios" ? wp("16%") : wp("12s%"),
          backgroundColor: "#f7faf8",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Button
          onPress={() => {
            select_value === "custom"
              ? set_countries_modal_vis(!countries_modal_vis)
              : set_modal_vis(!modal_vis);
          }}
          title={"GO!"}
        ></Button>
      </View>
      <View style={{ height: hp("20%"), width: wp("80%") }}>
        <FlatList
          data={keys}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  backgroundColor: "#394048",
                  borderRadius: 5,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  margin: wp("0.5%"),
                }}
              >
                <Text
                  style={{
                    fontFamily: "RobotoRegular",
                    fontSize: wp("5%"),
                    paddingTop: hp("1%"),
                    paddingBottom: hp("1.9%"),
                    paddingLeft: wp("4%"),
                    color: "lightgrey",
                  }}
                  onPress={() => {
                    getData(item.save);
                    set_current_key(item.save);
                  }}
                >
                  {item.save}
                </Text>

                <Text
                  style={{
                    fontFamily: "RobotoRegular",
                    fontSize: wp("5%"),
                    paddingTop: hp("1%"),
                    paddingBottom: hp("1.9%"),
                    paddingRight: wp("4%"),
                    color: "white",
                  }}
                  onPress={() => {
                    removeData(item.save);
                  }}
                >
                  {"x"}
                </Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.save}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: hp("165%"),
    width: wp("100%"),
    bottom: 0,
    backgroundColor: "#fff",
  },
  countries_modal_container: {
    top: Platform.OS === "ios" ? -hp("17%") : 0,
    alignSelf: "center",
    marginHorizontal: 0,
    padding: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: hp("60%"),
    width: wp("90%"),
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
  header: {
    fontFamily: "RobotoLight",
    fontSize: wp("8%"),
    marginTop: hp("6%"),
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
