import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ScrollView style={[styles.container, darkMode && styles.darkContainer]}>
      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={80} color="#007bff" />
        <Text style={styles.userName}>Annette</Text>
        <Text style={styles.userEmail}>annette@example.com</Text>
      </View>

      <View style={[styles.infoSection, darkMode && styles.darkInfoSection]}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Language</Text>
          <Text style={styles.infoValue}>English</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    padding: 20,
  },
  darkContainer: { backgroundColor: "#121212" },
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
  infoSection: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginBottom: 20,
  },
  darkInfoSection: {
    backgroundColor: "#1e1e1e",
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
