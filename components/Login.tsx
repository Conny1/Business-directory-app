import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
// import * as Linking from "expo-linking";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    // Warm up the android browser to improve UX
    // https://docs.expo.dev/guides/authentication/#improving-user-experience
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export const Login = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({});

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("@/assets/images/login.png")}
        />
      </View>
      <View style={styles.info}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "800",
            textAlign: "center",
            textTransform: "capitalize",
            letterSpacing: 2,
          }}
        >
          Your ultimate{" "}
          <Text
            style={{
              color: "#6d43df",
            }}
          >
            community business directory
          </Text>
          app
        </Text>

        <Text
          style={{
            textAlign: "center",
            marginHorizontal: 15,
            color: "gray",
          }}
        >
          Find your favarite business near you and post your own business to
          your community.
        </Text>

        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text style={{ color: "#fff", textAlign: "center" }}>
            Lets get started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    borderBlockColor: "black",

    display: "flex",
    alignItems: "center",
    marginTop: 70,
  },
  img: {
    height: 400,
    width: 250,
    objectFit: "contain",
  },
  info: {
    display: "flex",

    textAlign: "center",
    gap: 20,
    marginVertical: 15,
  },
  btn: {
    backgroundColor: "#6d43df",
    width: 200,
    alignSelf: "center",
    padding: 10,
    borderRadius: 20,
  },
});
