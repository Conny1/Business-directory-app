import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BusinessCard from "../Global/BusinessCard";
import { getBusiness } from "@/firebase/firebase";
import { businessType } from "@/utils/types";

const ExploreBusinesslist = () => {
  const [business, setbusiness] = useState<businessType[]>([]);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setloading(true);
    getBusiness().then((data) => {
      setbusiness(data);
      setloading(false);
    });
  }, []);

  return (
    <View style={{ height: 450 }}>
      {loading ? (
        <View>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          horizontal={false}
          scrollEnabled
          style={{ marginLeft: 18 }}
          showsHorizontalScrollIndicator={false}
          data={business}
          renderItem={({ item, index }) => (
            <BusinessCard key={index} item={item} screen="explore" />
          )}
        />
      )}
    </View>
  );
};

export default ExploreBusinesslist;

const styles = StyleSheet.create({});
