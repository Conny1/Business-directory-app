import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import RNPickerSelect from "react-native-picker-select";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";

const Addbusiness = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Add Business" });
  }, []);
  const categories = [
    { label: "Technology", value: "technology" },
    { label: "Health & Wellness", value: "health_wellness" },
    { label: "Finance", value: "finance" },
    { label: "Education", value: "education" },
    { label: "Food & Beverages", value: "food_beverages" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Travel & Tourism", value: "travel_tourism" },
    { label: "Fitness", value: "fitness" },
    { label: "Fashion", value: "fashion" },
    { label: "Automotive", value: "automotive" },
    { label: "Real Estate", value: "real_estate" },
    { label: "Sports", value: "sports" },
    { label: "Photography", value: "photography" },
    { label: "Home & Garden", value: "home_garden" },
    { label: "Music", value: "music" },
  ];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <MaterialIcons name="image" size={100} color="gray" />
        )}

        <TouchableOpacity
          onPress={pickImage}
          style={{
            backgroundColor: "#6d43df",
            width: "40%",
            padding: 10,
            borderRadius: 10,
            marginLeft: "5%",
            marginVertical: 20,
          }}
        >
          <Text style={{ textAlign: "center", color: "#fff" }}>select</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.textinputContainer}>
        <TextInput style={styles.textinput} placeholder="Name" />
        <TextInput style={styles.textinput} placeholder="Address" />
        <TextInput style={styles.textinput} placeholder="Contact" />
        <TextInput style={styles.textinput} placeholder="Website" />
        <TextInput
          multiline={true}
          style={{ ...styles.textinput, height: 100 }}
          placeholder="About"
        />
        <Text>Select Category </Text>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={categories}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#6d43df",
          width: "90%",
          padding: 10,
          borderRadius: 10,
          marginLeft: "5%",
          marginVertical: 20,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>Add</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Addbusiness;

const styles = StyleSheet.create({
  textinputContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  textinput: {
    borderWidth: 1,
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
  },
  imageContainer: {
    marginHorizontal: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});
