import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const CountryItem = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={styles.image_container}>
          <Image
            style={styles.image}
            source={{ uri: "https://www.countryflags.io/sk/flat/64.png" }}
          ></Image>
        </View>

        <Text style={styles.country_name}>{`Slovakia`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  country_name: {
    fontFamily: "RobotoMedium",
    fontSize: wp("6%"),
    color: "#394048",
    paddingTop: hp("2.2%"),
    paddingLeft: wp("5%"),
  },
  container: {
    width: wp("85%"),
    height: hp("8.5%"),
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 20,
  },
  image_container: {
    marginTop: hp("1%"),
    marginLeft: wp("3.6%"),
    width: wp("13%"),
    height: wp("13%"),
  },
});

export default CountryItem;
