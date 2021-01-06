import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Button,
  ScrollView,
  FlatList,
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
  const axios = require("axios");
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

  return (
    <View style={styles.container}>
      {/* MODAL FOR SHOWING DATA CONTENT */}
      <Modal
        onBackdropPress={() => {
          set_modal_vis(!modal_vis);
        }}
        isVisible={modal_vis}
        style={{ margin: 0, padding: 0 }}
        propagateSwipe={true}
      >
        <ScrollView style={{ top: hp("20%") }}>
          <View style={styles.modal_container}>
            <View style={{ flex: 1 }}>
              <Text style={styles.header}>{modal_data.continent}</Text>
            </View>

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
      >
        <View style={styles.countries_modal_container}>
          <View style={{ flex: 1, top: hp("-5%") }}>
            <Text style={styles.header}>{`Pick your countries`}</Text>
          </View>

          <View style={{ margin: 10, height: hp("45%") }}>
            <FlatList
              data={countries_data}
              initialNumToRender={15}
              maxToRenderPerBatch={7}
              //ListHeaderComponent={renderHeader}
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
              keyExtractor={(item) => item.countryInfo._id.toString()}
            />
          </View>
          <View
            style={{
              width: wp("15%"),
              alignSelf: "center",
              marginBottom: hp("0.5%"),
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
                  set_modal_data(temp);
                  //set_countries_modal_vis(false);
                  set_modal_vis(true);
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
    marginBottom: 0,
    alignSelf: "center",
    marginHorizontal: 0,
    padding: 0,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    height: hp("70%"),
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
