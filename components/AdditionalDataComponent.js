import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AdditionalDataComponent = (props) => {
  const renderItem = ({ item }) => <Item title={item.title} id={item.id} />;

  const Item = ({ title, id }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{id}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={props.data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp("75%"),
    height: hp("50%"),
    backgroundColor: "white",
    borderBottomLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },

    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    margin: 5,
  },
  text: {
    fontFamily: "RobotoMedium",
    fontSize: wp("2%"),
  },
  item: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: wp("2%"),
    marginVertical: wp("0.5%"),
    marginHorizontal: wp("1%"),
  },
  title: {
    fontSize: wp("5%"),
  },
});

export default AdditionalDataComponent;
