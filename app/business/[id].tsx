import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Rating } from "react-native-ratings";
import { addComent, getBusinessByID, getCommentbyBusiness } from "@/firebase/firebase";
import { businessType, Comment } from "@/utils/types";
import { useUser } from "@clerk/clerk-expo";


const Business = () => {
  const { id } = useLocalSearchParams();
  const [BusinessDetail, setBusinessDetail] = useState<
    businessType | undefined
  >(undefined);
  const [loading, setloading] = useState(false);
  const [comment, setcomment] = useState("")
  const [comments, setcomments] = useState <Comment[]> ([])
  const user = useUser().user
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({ headerShown: true, title: "Business" });
    setloading(true);
    getBusinessByID(id as string).then((data) => {
      setBusinessDetail(data[0]);
      setloading(false);
      const businessid = data[0].id as string
      getCommentbyBusiness(businessid).then((data)=> setcomments(data) )
    });
  
   
  }, []);

  const submitComment= ()=>{
    if(comment === ""){
    return  alert("Cannot add an empty comment")
    }
    try {
      setloading(true)
      const userName = user?.fullName as string
      const businessid = BusinessDetail?.id as string
      addComent({user:userName, comment:comment, businessid:businessid})
      setcomment("")
      setloading(false)

    } catch (error) {
      
    }
  }

  return !BusinessDetail ? (
    loading ? (
      <View>
        <ActivityIndicator size="large" />
      </View>
    ) : (
      <View>
        <Text>No business Preview available</Text>
      </View>
    )
  ) : (
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
        <View style={{ height: 100 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={{ maxHeight: 100 }}
          >
            <Text>{BusinessDetail.about}</Text>
          </ScrollView>
        </View>
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
          showRating={user?.id.toString() === BusinessDetail?.userid?.toString()}
          //   onFinishRating={this.ratingCompleted}
        />

        <View style={styles.reviewInput}>
          <TextInput
            style={{ padding: 10, width: "90%", height: 70 }}
            placeholder="search..."
            onChangeText={(val)=>setcomment(val)}
            value={comment}
          />
        </View>
       { comment && loading ?<ActivityIndicator size="large" /> : <TouchableOpacity
        onPress={submitComment}
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
        </TouchableOpacity>}
        <View style={styles.comment}>
         {
          comments.length ==0 ? <Text>No comments available</Text> :
           <FlatList
           horizontal={true}
          data={comments}
          scrollEnabled
          style={{  height:"auto" }}
          showsHorizontalScrollIndicator={false}
          renderItem={({item})=>{
         return <View style={styles.commentCard} key={item.id}> 
         <Text style={{backgroundColor:"#217af2", fontSize:10, alignSelf:"flex-start" ,padding:5, color:"#fff", borderRadius:10}} > {item.user} </Text>
         <Text style={{fontSize:13, fontWeight:600}} >{item.comment} </Text>
          </View>   
          }}
        />
         }
         
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
    marginBottom:20
   
   
  },
  commentCard:{
    backgroundColor:"#ffff",
    padding:10,
    borderRadius:20,
    marginLeft:10,
    width:200,   
    alignSelf:"flex-start"
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
