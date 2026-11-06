import { useState } from "react";
import { router } from 'expo-router';
import {View,Text,TextInput,TouchableOpacity,StyleSheet,Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  if (unlocked) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.home}>
          <Text style={styles.logo}>LocalVault</Text>
          <Text style={styles.heading}>Your vault is ready.</Text>
          <Text style={styles.subtitle}>
            Welcome to your temporary home screen.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>L</Text>
          </View>

          <Text style={styles.logo}>LocalVault</Text>
          <Text style={styles.tagline}>YOUR PASSWORDS. YOUR DEVICE.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.heading}>Welcome back</Text>
          <Text style={styles.subtitle}>
            Enter your master password to unlock your vault.
          </Text>

          <Text style={styles.label}>MASTER PASSWORD</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your master password"
            placeholderTextColor="#777777"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />

          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (password.trim().length > 0) {
                setUnlocked(true);
              }
            }}
          >
            <Text style={styles.buttonText}>Unlock Vault</Text>
          </TouchableOpacity> */}
        <TouchableOpacity
  style={styles.button}
  onPress={() => {
    console.log("Unlock button clicked");

    if (password.trim().length > 0) {
      console.log("Navigating to notes");
      router.replace("/notes");
    } else {
      Alert.alert("Enter password", "Please enter your password.");
    }
  }}
>
  <Text style={styles.buttonText}>Unlock Vault</Text>
</TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            LOCKED • STORED LOCALLY ON YOUR DEVICE
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },
  content: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 70,
  },
  logoBox: {
    width: 55,
    height: 55,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  logoIcon: {
    color: "#000000",
    fontSize: 30,
    fontWeight: "bold",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 27,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  tagline: {
    color: "#888888",
    fontSize: 10,
    letterSpacing: 2,
    marginTop: 8,
  },
  form: {
    width: "100%",
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#999999",
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 30,
  },
  label: {
    color: "#AAAAAA",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#222222",
    borderWidth: 1,
    borderColor: "#383838",
    borderRadius: 10,
    padding: 17,
    color: "#FFFFFF",
    fontSize: 15,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FFFFFF",
    padding: 17,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    color: "#666666",
    fontSize: 10,
    letterSpacing: 1,
  },
  home: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
  },
});
