import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import RegistrationPage from "./src/Component/RegistrationPage/Registration";
import LoginWithGoogle from "./src/Component/LOGIN/LoginWithGoogle";
import { colors } from "./src/Utils/colors";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      {/* <StatusBar style="auto" />
       <LoginWithGoogle /> 
      <RegistrationPage /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginWithGoogle">
          <Stack.Screen name="LoginWithGoogle" component={LoginWithGoogle} />
          <Stack.Screen name="RegistrationPage" component={RegistrationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.offWhite,
    alignItems: "center",
    justifyContent: "center",
  },
});
