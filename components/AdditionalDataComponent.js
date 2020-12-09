import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const AdditionalDataComponent = (props) => {
  const renderItem = ({ item }) => <Item title={item.title} />;

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
    height: hp("30%"),
    backgroundColor: "blue",
  },
  text: {
    fontFamily: "RobotoThin",
    fontSize: wp("5%"),
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default AdditionalDataComponent;
