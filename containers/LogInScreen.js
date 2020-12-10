import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView,
} from "react-native";
import { TextInput, TouchableHighlight } from "react-native-gesture-handler";
// import axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen({ setToken, setId }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ScrollView>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="votre email"
          placeholderTextColor="white"
          value={email}
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="votre mot de passe"
          placeholderTextColor="white"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        {/* <TouchableOpacity
          style={styles.loginButton}
          onPress={async () => {
            try {
              const response = await axios.post(
                "----PUT HERE----BACKEND URL-------",
                {
                  email: email,
                  password: password,
                }
              );
              if (response.data.token) {
                const token = response.data.token;
                const id = response.data.id;
                await AsyncStorage.setItem("userToken", token);
                await AsyncStorage.setItem("userId", id);
                setToken(token);
                setId(id);
                alert("connexion réussie!");
              } else {
                alert("Une erreur est survenue, veuillez réessayer");
              }
            } catch (error) {
              alert(error.message);
            }
          }}
        >
          <Text style={styles.loginButtonText}>Se connecter</Text>
        </TouchableOpacity> */}
        <TouchableHighlight
          style={styles.linkToSignUp}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={styles.linkToSignUpText}>
            Pas de compte ? S'inscrire
          </Text>
        </TouchableHighlight>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "grey",
    alignItems: "center",
  },
  input: {
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 300,
    lineHeight: 21,
    margin: 25,
    fontSize: 18,
    color: "white",
    paddingBottom: 20,
    justifyContent: "flex-start",
  },
});
