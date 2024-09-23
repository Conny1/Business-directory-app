import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";

import { Href, useRouter } from "expo-router";
type Props = {
  screen: string;
  item: {
    name: string;
    imgurl: string;
    address: string;
    category: string;
    rating: number;
    id?: string;
  };
};
const BusinessCard = ({ item, screen }: Props) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => {
        const path = `/business/${item.id}` as Href<string>;
        router.push(path);
      }}
      style={{
        display: "flex",
        flexDirection: screen == "home" ? "column" : "row",
        marginBottom: screen == "home" ? 5 : 20,
      }}
    >
      <Image
        style={{
          height: screen === "home" ? 160 : 100,
          width: screen === "home" ? 250 : 150,
          marginRight: 10,
          borderRadius: 10,
        }}
        source={{ uri: item.imgurl }}
      />
      <View>
        <Text style={{ fontWeight: 700, marginBottom: 5, marginTop: 5 }}>
          {item.name}
        </Text>
        <Text style={{ color: "gray", marginBottom: 5 }}>{item.address}</Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            // justifyContent: "space-between",
            gap: 130,
          }}
        >
          <View style={styles.ratingContainer}>
            <Image
              style={{ height: 20, width: 20 }}
              source={require("../../assets/images/star.png")}
            />
            <Text>{item.rating}</Text>
          </View>
          {screen === "home" && (
            <Text
              style={{
                backgroundColor: "#6d43df",
                color: "#fff",
                padding: 5,
                borderRadius: 10,
                fontSize: 13,
              }}
            >
              {item.category}
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BusinessCard;
const styles = StyleSheet.create({
  ratingContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
