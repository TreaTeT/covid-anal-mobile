import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";
import CountryItem from "../components/CountryItem";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Modal from "react-native-modal";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

function CountriesScreen(props) {
  const d = props.data.data.filter(
    (item) =>
      item.country !== "Diamond Princess" && item.country !== "MS Zaandam"
  );

  const [modal_data, set_modal_data] = useState({});
  const [modal_vis, set_modal_vis] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        onBackdropPress={() => {
          set_modal_vis(!modal_vis);
        }}
        isVisible={modal_vis}
      >
        <View style={styles.modal_container}>
          <Text
            style={{
              fontFamily: "RobotoLight",
              fontSize: wp("4%"),
              textAlign: "center",
            }}
          >
            {modal_data.country}
          </Text>
        </View>
      </Modal>
      <FlatList
        data={d}
        initialNumToRender={15}
        maxToRenderPerBatch={7}
        renderItem={({ item }) => (
          <CountryItem
            country={item.country}
            ab={item.countryInfo.iso2}
            id={item.countryInfo._id}
            data={item}
            onPress={() => {
              set_modal_data(item);
              set_modal_vis(!modal_vis);
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
    flex: 1,
    width: wp("100%"),
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  modal_container: {
    width: wp("80%"),
    height: hp("60%"),
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: "row",
  },
});

export default CountriesScreen;
