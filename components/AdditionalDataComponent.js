import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AdditionalDataComponent = (props) => {
  let formatNumber = (num) => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  const renderItem = ({ item }) => (
    <Item title={item.title} data={formatNumber(item.data)} />
  );

  const Item = ({ title, data }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.number_container}>
        <Text style={styles.number}>{data}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.data}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("75%"),
    height: hp("42.5%"),
    backgroundColor: "white",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,

    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },

    // shadowOpacity: 0.36,
    // shadowRadius: 6.68,
    // elevation: 11,
    // margin: 5,
  },

  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("2%"),
    marginVertical: wp("0.5%"),
    marginHorizontal: wp("1%"),
  },
  text: {
    fontFamily: "RobotoLight",
    fontSize: wp("4.5%"),
  },
  number: {
    fontFamily: "RobotoMedium",
    fontSize: wp("4%"),
    color: "#fff",
  },

  number_container: {
    paddingVertical: wp("0.5%"),
    paddingHorizontal: wp("3.5%"),
    borderRadius: 7,
    backgroundColor: "#343434",
  },
});

export default AdditionalDataComponent;
