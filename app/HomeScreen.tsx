import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserDashboard() {
  const navigation = useNavigation();

  const setTokenAndNavigate = async () => {
    try {
      await AsyncStorage.setItem('token', '1');
      navigation.navigate('3DBot');
    } catch (error) {
      console.error('Error setting token:', error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/logo.png")}
      style={styles.background}
    >
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../assets/logo3.jpg")} style={styles.logo} />
          <Text style={styles.welcomeText}>Welcome back, Annette</Text>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.userInfoCard}>
            <Text style={styles.userInfoText}>Age: 30</Text>
            <Text style={styles.userInfoText}>Gender: Female</Text>
            <Text style={styles.userInfoText}>Dosha: Vata</Text>
          </View>
          <View style={styles.devicesCard}>
            <Ionicons name="fitness-outline" size={32} color="#fff" />
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

        <TouchableOpacity 
          style={{ backgroundColor: 'blue', padding: 12, margin: 10, borderRadius: 8 }}
          onPress={setTokenAndNavigate}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Go to 3DBot with Token=2</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  welcomeText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  userInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  userInfoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
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
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 15,
    padding: 20,
    width: "48%",
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#001",
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