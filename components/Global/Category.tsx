import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Href, useRouter } from "expo-router";
import { getCategories } from "../../firebase/firebase";
import { CategoryType } from "@/utils/types";
import { DocumentData } from "firebase/firestore/lite";

const Category = ({ screen }: { screen: string }) => {
  const [category, setcategory] = useState<DocumentData[]>([]);
  const [loading, setloading] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setloading(true);
    getCategories().then((data) => {
      setcategory(data);
      setloading(false);
    });
  }, []);

  return (
    <View style={styles.categoryContainer}>
      {screen == "home" && (
        <Text
          style={{
            marginLeft: 20,
            fontWeight: "500",
            fontSize: 18,
          }}
        >
          Category
        </Text>
      )}
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={category}
          horizontal={true}
          style={{ marginLeft: 18 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.name}
              onPress={() => {
                if (screen === "home") {
                  let path = `/categorybusiness/${item.name}` as Href<string>;
                  router.push(path);
                }
              }}
            >
              <Image
                style={{
                  height: 60,
                  width: 60,
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
      )}
    </View>
  );
};

export default Category;
const styles = StyleSheet.create({
  categoryContainer: {
    marginTop: 20,
  },
});
