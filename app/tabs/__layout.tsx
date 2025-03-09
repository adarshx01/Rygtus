import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../HomeScreen";
import VisionBot from "../VisionBot";
import TalkingBot from "../3DBot";
import MedBot from "../MedBot";
import SettingsScreen from "../Settings";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function Tabs({ userType }) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarInactiveTintColor: "grey",
        tabBarActiveTintColor: "blue",
        tabBarIcon: ({ color, size }) => {
          let iconName = "";
          if (route.name === "HomeScreen") {
            iconName = "home";
          } else if (route.name === "VisionBot") {
            iconName = "chatbubble";
          } else if (route.name === "3DBot") {
            iconName = "camera";
          } else if (route.name === "MedBot") {
            iconName = "medkit";
          } else if (route.name === "Settings") {
            iconName = "settings";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      {userType === "doctor" && (
        <Tab.Screen name="VisionBot" component={VisionBot} />
      )}
      {userType === "patient" && (
        <Tab.Screen name="3DBot" component={TalkingBot} />
      )}
      <Tab.Screen name="MedBot" component={MedBot} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
