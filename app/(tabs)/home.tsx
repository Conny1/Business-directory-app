import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const Home = () => {
  const user = useUser().user;
  const special = [
    {
      imgurl:
        "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?t=st=1726773348~exp=1726776948~hmac=05fb79dcb2c841d8695317b6f88bb0b68f2877cd6b11c16e25e4ec71a3235810&w=740",
    },
    {
      imgurl:
        "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg?t=st=1726773509~exp=1726777109~hmac=8ad6eaa626bdfcf7f8ffe764e00bd99a96e6b80f0f48d1375258842ae057553d&w=740",
    },
    {
      imgurl:
        "https://img.freepik.com/free-photo/closeup-shot-front-black-vehicle-parked-dry-field-cloudy-sky_181624-9587.jpg?t=st=1726773627~exp=1726777227~hmac=1577352e5c6d65719e530069c3bdb2f8fc2154af91d7ee54ff53f75b9279b5c6&w=900",
    },
    {
      imgurl:
        "https://img.freepik.com/free-photo/sports-car-races-through-dark-blurred-motion-generative-ai_188544-12490.jpg?t=st=1726773359~exp=1726776959~hmac=bf57bc06d77afa4265712300b241d0135974115d60ed8bb12412b4106962dfc2&w=826",
    },
    {
      imgurl:
        "https://img.freepik.com/free-photo/red-motor-biking-road_114579-5071.jpg?t=st=1726773706~exp=1726777306~hmac=3aa0c8302267e453d7e4c202a8cf51d8557013458ec91f685a042db630e1b641&w=740",
    },
  ];
  const category = [
    {
      name: "shopping",
      imgurl:
        "https://img.freepik.com/free-photo/luxurious-car-parked-highway-with-illuminated-headlight-sunset_181624-60607.jpg?t=st=1726773348~exp=1726776948~hmac=05fb79dcb2c841d8695317b6f88bb0b68f2877cd6b11c16e25e4ec71a3235810&w=740",
    },
    {
      name: "Plumber",
      imgurl:
        "https://img.freepik.com/free-photo/smartwatch-screen-digital-device_53876-97321.jpg?t=st=1726773509~exp=1726777109~hmac=8ad6eaa626bdfcf7f8ffe764e00bd99a96e6b80f0f48d1375258842ae057553d&w=740",
    },
    {
      name: "Saloons",
      imgurl:
        "https://img.freepik.com/free-photo/closeup-shot-front-black-vehicle-parked-dry-field-cloudy-sky_181624-9587.jpg?t=st=1726773627~exp=1726777227~hmac=1577352e5c6d65719e530069c3bdb2f8fc2154af91d7ee54ff53f75b9279b5c6&w=900",
    },
    {
      name: "Daily Product",
      imgurl:
        "https://img.freepik.com/free-photo/sports-car-races-through-dark-blurred-motion-generative-ai_188544-12490.jpg?t=st=1726773359~exp=1726776959~hmac=bf57bc06d77afa4265712300b241d0135974115d60ed8bb12412b4106962dfc2&w=826",
    },
    {
      name: "Cars",
      imgurl:
        "https://img.freepik.com/free-photo/red-motor-biking-road_114579-5071.jpg?t=st=1726773706~exp=1726777306~hmac=3aa0c8302267e453d7e4c202a8cf51d8557013458ec91f685a042db630e1b641&w=740",
    },
    {
      name: "Biles",
      imgurl:
        "https://img.freepik.com/free-photo/red-motor-biking-road_114579-5071.jpg?t=st=1726773706~exp=1726777306~hmac=3aa0c8302267e453d7e4c202a8cf51d8557013458ec91f685a042db630e1b641&w=740",
    },
    {
      name: "Clothes",
      imgurl:
        "https://img.freepik.com/free-photo/red-motor-biking-road_114579-5071.jpg?t=st=1726773706~exp=1726777306~hmac=3aa0c8302267e453d7e4c202a8cf51d8557013458ec91f685a042db630e1b641&w=740",
    },
  ];
  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={styles.user}>
          <Image
            style={{
              borderWidth: 1,
              height: 50,
              width: 50,
              borderRadius: 30,
            }}
            source={{ uri: user?.imageUrl }}
            alt="img"
          />

          <View>
            <Text style={{ color: "#fff" }}>Welcome</Text>
            <Text
              style={{
                fontSize: 18,
                textTransform: "capitalize",
                color: "#fff",
                fontWeight: 500,
              }}
            >
              {user?.fullName}{" "}
            </Text>
          </View>
        </View>
        <View style={styles.searchParent}>
          <MaterialIcons name="search" size={24} color="black" />
          <TextInput
            style={{ padding: 10, width: "90%" }}
            placeholder="search..."
          />
        </View>
      </View>

      <View style={styles.specialsContainer}>
        <Text
          style={{
            marginLeft: 20,
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          #Special for you
        </Text>
        <FlatList
          data={special}
          horizontal={true}
          style={{ marginLeft: 20 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Image
              style={{
                height: 160,
                width: 300,
                marginRight: 10,
                borderRadius: 10,
              }}
              source={{ uri: item.imgurl }}
            />
          )}
        />
      </View>

      <View style={styles.categoryContainer}>
        <Text
          style={{
            marginLeft: 20,
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          Category
        </Text>
        <FlatList
          data={category}
          horizontal={true}
          style={{ marginLeft: 18 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  marginRight: 10,
                  borderRadius: 10,
                }}
                source={{ uri: item.imgurl }}
              />
              <Text style={{ fontWeight: "bold", textAlign: "center" }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View>
        <Text
          style={{
            marginLeft: 20,
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          Popular busineses
        </Text>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  searchContainer: {
    height: 170,

    backgroundColor: "#6d43df",
    display: "flex",
    alignItems: "center",

    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  searchParent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  user: {
    display: "flex",
    flexDirection: "row",
    width: "80%",
    height: 100,
    gap: 10,
    alignItems: "center",
  },
  specialsContainer: {
    marginTop: 20,
  },
  categoryContainer: {
    marginTop: 20,
  },
});
