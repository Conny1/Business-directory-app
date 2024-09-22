import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Category from "@/components/Global/Category";

import ExploreBusinesslist from "@/components/Explore/ExploreBusinesslist";

const Expolore = () => {
  return (
    <View style={styles.main}>
      <Text style={{ fontSize: 25, fontWeight: 600, margin: 20 }}>
        Expolore More
      </Text>
      <View style={styles.searchParent}>
        <MaterialIcons name="search" size={24} color="black" />
        <TextInput
          style={{ padding: 10, width: "90%" }}
          placeholder="search..."
        />
      </View>
      <Category screen="explore" />
      {/* busines */}

      <ExploreBusinesslist />
    </View>
  );
};

export default Expolore;
const styles = StyleSheet.create({
  searchParent: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
  },
  main: {
    display: "flex",
    gap: 20,
  },
});
