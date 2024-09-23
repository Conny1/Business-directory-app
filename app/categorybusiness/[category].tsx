import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import BusinessCard from "@/components/Global/BusinessCard";
import { getBusinessBytCategory } from "@/firebase/firebase";
import { businessType } from "@/utils/types";

const BusinessByCategory = () => {
  const [business, setbusiness] = useState<businessType[]>([]);
  const categoryname = useLocalSearchParams();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: categoryname.category,
    });
    const catName = categoryname.category as string;
    getBusinessBytCategory(catName).then((data) => setbusiness(data));
  }, [navigation, categoryname.category]);

  return (
    <View style={{ paddingTop: 10 }}>
      <FlatList
        horizontal={false}
        scrollEnabled
        style={{ marginLeft: 18 }}
        showsHorizontalScrollIndicator={false}
        data={business}
        renderItem={({ item }) => (
          <BusinessCard key={item.id} item={item} screen="explore" />
        )}
      />
    </View>
  );
};

export default BusinessByCategory;

const styles = StyleSheet.create({});
