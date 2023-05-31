import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../../Utils/colors";

WebBrowser.maybeCompleteAuthSession();

export default function LoginWithGoogle() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      "864302179655-eu9h1volmcj78umim5aruj66i54tphfi.apps.googleusercontent.com",
    iosClientId:
      "864302179655-9pfd7vr0l5lg9ojd91959aet8oi38ib9.apps.googleusercontent.com",
    androidClientId:
      "864302179655-pngn0jt816cvivj869rou8jq9lcqpffq.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `shashi ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      alert("user not found");
    }
  };
  const handleSignOut = async () => {
    await AsyncStorage.removeItem("@user");

    setToken("");
    setUserInfo(null);
  };

  return (
    <View style={styles.container}>
      {!userInfo ? (
        <>
          <TouchableOpacity
            onPress={() => {
              promptAsync();
            }}
            style={styles.button}
          >
            <Image
              source={require("./btn.png")}
              style={styles.image}
              alt="Google Image"
            />
            <Text style={styles.buttonText}>Sign in with Google</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.card}>
          {userInfo?.picture && (
            <Image source={{ uri: userInfo?.picture }} style={styles.image} />
          )}

          <Text>You are now Login!</Text>
        </View>
      )}
      {userInfo ? (
        <View
          style={{
            backgroundColor: colors.green,
            marginTop: 20,
            height: 40,
            width: 80,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
          }}
        >
          <TouchableOpacity title="Sign Out" onPress={handleSignOut}>
            <Text> Sign Out</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderRadius: 15,
    padding: 15,
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "#4285F4",
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
