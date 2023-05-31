import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import RegistrationPage from "./src/Component/RegistrationPage.js/Registration";
import LoginWithGoogle from "./src/Component/LOGIN/LoginWithGoogle";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* <LoginWithGoogle /> */}
      <RegistrationPage />
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
});
