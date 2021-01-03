import React, { useState } from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import RNPickerSelect from "react-native-picker-select";

export default function RegionsScreen(props) {
  const [state, set_state] = useState("");

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          width: wp("80%"),
          borderColor: "gray",
          borderRadius: 4,
          color: "black",
          padding: Platform.OS === "ios" ? 10 : 0,
        }}
      >
        <RNPickerSelect
          style={{
            width: wp("80%"),
          }}
          itemKey={state}
          value={state}
          onValueChange={(value) => set_state(value.toString())}
          items={props.data.data.map((item) => {
            return { label: `${item.continent}`, value: `${item.continent}` };
          })}
        />
      </View>
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
