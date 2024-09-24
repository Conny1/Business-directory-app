import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Href, useRouter } from "expo-router";

const Profile = () => {
  const { user } = useUser();
  const router = useRouter();

  return (
    <View>
      <View style={styles.user}>
        <Image
          style={{
            borderWidth: 1,
            height: 70,
            width: 70,
            borderRadius: 35,
          }}
          source={{ uri: user?.imageUrl }}
          alt="img"
        />

        <View>
          <Text
            style={{
              fontSize: 18,
              textTransform: "capitalize",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            {user?.fullName}
          </Text>
          <Text style={{ textAlign: "center" }}>
            {user?.primaryEmailAddress?.emailAddress}
          </Text>
        </View>
      </View>

      {/*  */}
      <View style={styles.btnGroup}>
        <TouchableOpacity
          onPress={() => {
            const path = "/business/addbusiness" as Href<String>;
            router.push(path);
          }}
          style={styles.btn}
        >
          <MaterialIcons name="add-business" size={50} color="red" />
          <Text>Add business</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            const path = "/business/mybusineses" as Href<String>;
            router.push(path);
          }}
          style={styles.btn}
        >
          <MaterialIcons name="business-center" size={50} color="#6d43df" />
          <Text>My business</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons name="share" size={50} color="gray" />
          <Text>Share App</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <MaterialIcons name="logout" size={50} color="red" />
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ marginTop: 50, textAlign: "center", color: "gray" }}>
        Developed by Conrad Mbuya
      </Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  btn: {
    borderWidth: 1,
    padding: 5,
    width: 150,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    gap: 10,
  },
  user: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 200,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
