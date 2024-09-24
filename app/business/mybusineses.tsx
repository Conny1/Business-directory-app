import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import BusinessCard from "@/components/Global/BusinessCard";
import { getBusinessByUserID } from "@/firebase/firebase";
import { businessType } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";


const MyBusiness = () => {
  const [business, setbusiness] = useState<businessType[]>([]);
  const [loading, setloading] = useState(false)
  const categoryname = useLocalSearchParams();
  const navigation = useNavigation();
  const user = useUser().user
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title:'my busineses',
    });
    const userid = user?.id as string;
    setloading(true)
    getBusinessByUserID(userid).then((data) =>{
        setloading(false)
        setbusiness(data)
    });
  }, [navigation, categoryname.category]);

  return (
    <View style={{ paddingTop: 10 }}>
        {
            business.length ===0? loading ?<ActivityIndicator size="large" /> :<Text>No Business Available</Text>:  
            <FlatList
            horizontal={false}
            scrollEnabled
            style={{ marginLeft: 18 }}
            showsHorizontalScrollIndicator={false}
            data={business}
            renderItem={({ item }) => (
              <BusinessCard key={item.id} item={item} screen="explore"/>
            )}
          />
        }
    
    </View>
  );
};

export default MyBusiness;

const styles = StyleSheet.create({});
