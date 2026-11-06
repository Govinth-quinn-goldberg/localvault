import { View, Text, StyleSheet } from "react-native";

export default function Passwords() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Password Vault</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#08090D",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#FFFFFF",
        fontSize: 25,
        fontWeight: "bold",
    },
});