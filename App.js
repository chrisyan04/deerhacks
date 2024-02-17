import { StatusBar } from "expo-status-bar";
import { StyleSheet, Alert, Button, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Button title="Login" onPress={() => Alert.alert("pressed login")} />
      </View>
      <View style={styles.centeredContainer}>
        <Text>Hello World</Text>
        <Button title="Read" onPress={() => Alert.alert("pressed read")} />
        <Button title="Write" onPress={() => Alert.alert("pressed write")} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  loginContainer: {
    position: "absolute",
    top: 40,
    right: 10,
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
});
