import {
  ActivityIndicator,
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
import {
  addData,
  fileUploadFirebase,
  getCategories,
} from "@/firebase/firebase";

const Addbusiness = () => {
  const navigation = useNavigation();
  const [image, setImage] = useState<string | null>(null);
  const [categories, setcategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [contact, setcontact] = useState("");
  const [website, setwebsite] = useState("");
  const [about, setabout] = useState("");
  const [category, setcategory] = useState("");
  const [rating] = useState(1);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Add Business" });
    getCategories().then((data) => {
      const resp = data.map((item) => ({
        label: item.name.toLocaleUpperCase(),
        value: item.name,
      })) as { label: string; value: string }[];

      setcategories(resp);
    });
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const submitData = async () => {
    if (
      name &&
      address &&
      contact &&
      about &&
      website &&
      category &&
      rating &&
      image
    ) {
      setloading(true);
      let url = image as string;
      const data = await fileUploadFirebase(url);
      if (data) {
        await addData({
          imgurl: data,
          name,
          address,
          contact,
          about,
          website,
          category: category.toLowerCase(),
          rating: 2,
        });
        setloading(false);
      } else {
        alert("Error Uploading image.Try again");
      }
    } else {
      alert("All fields are required");
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
        <TextInput
          onChangeText={(val) => setname(val)}
          style={styles.textinput}
          placeholder="Name"
        />
        <TextInput
          onChangeText={(val) => setaddress(val)}
          style={styles.textinput}
          placeholder="Address"
        />
        <TextInput
          onChangeText={(val) => setcontact(val)}
          style={styles.textinput}
          placeholder="Contact"
        />
        <TextInput
          onChangeText={(val) => setwebsite(val)}
          style={styles.textinput}
          placeholder="Website"
        />
        <TextInput
          multiline={true}
          style={{ ...styles.textinput, height: 100 }}
          placeholder="About"
          onChangeText={(val) => setabout(val)}
        />
        <Text>Select Category </Text>
        <RNPickerSelect
          onValueChange={(value) => setcategory(value)}
          items={categories}
        />
      </View>
      {loading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <TouchableOpacity
          onPress={submitData}
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
      )}
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
