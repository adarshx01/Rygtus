import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ImageBackground
      source={require("../assets/logo.png")}
      style={styles.background}
    >
      <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
        <View style={styles.header}>
          <Ionicons name="person-circle-outline" size={80} color="#007bff" />
          <Text style={[styles.userName, darkMode && styles.darkText]}>
            Annette
          </Text>
          <Text style={[styles.userEmail, darkMode && styles.darkText]}>
            annette@example.com
          </Text>
        </View>

        <View style={[styles.infoSection, darkMode && styles.darkInfoSection]}>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, darkMode && styles.darkText]}>
              App Version
            </Text>
            <Text style={[styles.infoValue, darkMode && styles.darkText]}>
              1.0.0
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, darkMode && styles.darkText]}>
              Dark Mode
            </Text>
            <Switch value={darkMode} onValueChange={setDarkMode} />
          </View>
          <View style={styles.infoItem}>
            <Text style={[styles.infoLabel, darkMode && styles.darkText]}>
              Language
            </Text>
            <Text style={[styles.infoValue, darkMode && styles.darkText]}>
              English
            </Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    padding: 20,
  },
  darkContainer: { backgroundColor: "rgba(18, 18, 18, 0.8)" },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 10,
  },
  userEmail: {
    fontSize: 16,
    color: "#666",
  },
  darkText: { color: "#fff" },
  infoSection: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  darkInfoSection: {
    backgroundColor: "rgba(30, 30, 30, 0.8)",
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
  },
});