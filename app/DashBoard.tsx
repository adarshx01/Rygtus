import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function UserDashboard() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require("../assets/logo3.jpg")} style={styles.logo} />
        <Text style={styles.welcomeText}>Welcome back, Annette</Text>
        <Ionicons name="notifications-outline" size={24} color="#333" />
      </View>

      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoCard}>
          <Text style={styles.userInfoText}>Age: 30</Text>
          <Text style={styles.userInfoText}>Gender: Female</Text>
          <Text style={styles.userInfoText}>Dosha: Vata</Text>
        </View>
        <View style={styles.devicesCard}>
          <Ionicons name="fitness-outline" size={32} color="#007bff" />
          <Text style={styles.devicesTitle}>Connected Devices</Text>
          <Text style={styles.devicesText}>Google Fit, Apple Health</Text>
        </View>
      </View>

      <View style={styles.reportsCard}>
        <Text style={styles.reportsTitle}>Recent Reports</Text>
        <Text style={styles.reportsText}>Blood Test: Normal</Text>
        <Text style={styles.reportsText}>Cholesterol: Slightly High</Text>
        <Text style={styles.reportsText}>Vitamin D: Deficient</Text>
      </View>

      <View style={styles.ayushSection}>
        <View style={styles.ayushCard}>
          <Ionicons name="leaf-outline" size={32} color="green" />
          <Text style={styles.ayushTitle}>Ayurveda</Text>
          <Text style={styles.ayushSubtitle}>Balance your Dosha</Text>
        </View>
        <View style={styles.ayushCard}>
          <Ionicons name="fitness-outline" size={32} color="blue" />
          <Text style={styles.ayushTitle}>Yoga</Text>
          <Text style={styles.ayushSubtitle}>Daily Yoga Routine</Text>
        </View>
        <View style={styles.ayushCard}>
          <Ionicons name="nutrition-outline" size={32} color="orange" />
          <Text style={styles.ayushTitle}>Diet</Text>
          <Text style={styles.ayushSubtitle}>Personalized Diet Plan</Text>
        </View>
        <View style={styles.ayushCard}>
          <Ionicons name="medkit-outline" size={32} color="red" />
          <Text style={styles.ayushTitle}>Herbs</Text>
          <Text style={styles.ayushSubtitle}>Herbal Recommendations</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#007bff",
  },
  welcomeText: {
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userInfoCard: {
    backgroundColor: "#e0f7fa",
    borderRadius: 15,
    padding: 20,
    flex: 1,
    marginRight: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  userInfoText: {
    color: "#007bff",
    fontSize: 16,
    marginBottom: 5,
  },
  devicesCard: {
    backgroundColor: "#e3f2fd",
    borderRadius: 15,
    padding: 20,
    flex: 1,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  devicesTitle: {
    color: "#007bff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  devicesText: {
    color: "#555",
    fontSize: 14,
    textAlign: "center",
  },
  reportsCard: {
    backgroundColor: "#fff3e0",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reportsTitle: {
    color: "#ff8f00",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reportsText: {
    color: "#ff6f00",
    fontSize: 16,
    marginBottom: 5,
  },
  ayushSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  ayushCard: {
    backgroundColor: "#e8f5e9",
    borderRadius: 15,
    padding: 20,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ayushTitle: {
    color: "#388e3c",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  ayushSubtitle: {
    color: "#66bb6a",
    fontSize: 14,
    textAlign: "center",
  },
});