import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import { colors } from "../../Utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function RegistrationPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !mobileNumber || !password || !confirmPassword) {
      Alert.alert("Validation Error", "Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Validation Error", "Passwords do not match.");
      return;
    }
    const userData = { name, email, mobileNumber };
    try {
      await AsyncStorage.setItem("@registrationData", JSON.stringify(userData));
      console.log("Registration data stored successfully", userData);
    } catch (error) {
      console.error("Error storing registration data:", error);
    }

    // Perform registration logic here
    // You can validate the form fields and make API calls to register the user

    // Clear form fields after successful registration
    setName("");
    setEmail("");
    setMobileNumber("");
    setPassword("");
    setConfirmPassword("");

    // Display a success message
    Alert.alert(
      "Registration Successful",
      "You have been successfully registered."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}> Registration </Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobileNumber}
        onChangeText={(text) => setMobileNumber(text)}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: colors.offWhite,
  },
  input: {
    width: windowWidth * 0.8,
    height: 40,
    borderColor: colors.gray,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  button: {
    width: windowWidth * 0.8,
    backgroundColor: colors.green,
    borderRadius: 5,
    marginTop: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 12,
  },
});
