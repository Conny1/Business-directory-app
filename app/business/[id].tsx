import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Rating, AirbnbRating } from "react-native-ratings";

const Business = () => {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Business" });
  }, []);
  const BusinessDetail = {
    address: "123 Market Street, Downtown",
    rating: 4.5,
    name: "FreshGrocer",
    category: "Shopping", // Random category added
    imgurl:
      "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?t=st=1726773348~exp=1726776948~hmac=05fb79dcb2c841d8695317b6f88bb0b68f2877cd6b11c16e25e4ec71a3235810&w=740",
  };

  return (
    <ScrollView style={styles.busines}>
      {/* into */}
      <View>
        <Image source={{ uri: BusinessDetail.imgurl }} height={250} />
        <View style={styles.intro}>
          <Text style={{ fontSize: 20, fontWeight: 600 }}>
            {BusinessDetail.name}
          </Text>
          <Text>{BusinessDetail.address}</Text>
        </View>
      </View>
      {/* actions btn */}
      <View style={styles.actions}>
        <View>
          <MaterialIcons name="call" size={40} color="green" />
          <Text>Call</Text>
        </View>
        <View>
          <MaterialIcons name="location-pin" size={40} color="blue" />
          <Text> Location </Text>
        </View>

        <View>
          <MaterialIcons name="share" size={40} color="gray" />
          <Text>Share</Text>
        </View>
        <View>
          <MaterialIcons name="web" size={40} color="red" />
          <Text> Web </Text>
        </View>
      </View>
      {/* about */}
      <View style={styles.about}>
        <Text style={{ fontSize: 20, fontWeight: 600 }}>About</Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nam
          aperiam nostrum quis, modi voluptatibus. Voluptate debitis ipsam illum
          repellendus delectus! Quisquam eligendi sequi nemo similique nihil
          mollitia tempora at! Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Beatae molestiae perferendis maiores doloribus,
          animi molestias non amet nulla velit assumenda fuga. Velit vero optio
          reiciendis molestias totam fuga, nam in.
        </Text>
      </View>
      {/* Reviews */}
      <View>
        <Text style={{ marginHorizontal: 20, fontSize: 20, fontWeight: 600 }}>
          Reviews
        </Text>

        <Rating
          style={{ marginTop: 20 }}
          type="star"
          ratingCount={5}
          imageSize={40}
          // showRating
          //   onFinishRating={this.ratingCompleted}
        />

        <View style={styles.reviewInput}>
          <TextInput
            style={{ padding: 10, width: "90%", height: 70 }}
            placeholder="search..."
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#6d43df",
            width: 100,
            padding: 10,
            borderRadius: 10,
            marginLeft: "30%",
            marginVertical: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>Submit</Text>
        </TouchableOpacity>
        <View style={styles.comment}>
          <Text>My sample comment </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Business;

const styles = StyleSheet.create({
  busines: {},
  comment: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  intro: {
    marginTop: -30,
    zIndex: 999,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  about: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  reviewInput: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
});
