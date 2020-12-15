import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import CountryItem from "../components/CountryItem";

function CountriesScreen(props) {
  const renderItem = ({ item }) => {
    <CountryItem
      country={item.country}
      ab={item.countryInfo._iso2}
      id={props.data.indexOf(item)}
    />;
  };
  return (
    <View style={styles.container}>
      {/* {console.log(typeof props.data)}
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => props.data.indexOf(item)}
      ></FlatList> */}

      <CountryItem country={"Slovakia"} id={1} ab={"sk"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CountriesScreen;
