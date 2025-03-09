import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AuthScreen from "./AuthScreen";
import SignupScreen from "./SignupScreen";
import Tabs from "./tabs/__layout";

const Stack = createStackNavigator();

export default function Layout({ user }) {
  // Assume user.userType is available (either 'patient' or 'doctor')

  const userType = user?.userType || "doctor";

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right"  }}
    >
      <Stack.Screen name="AuthScreen" component={AuthScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Dashboard">
        {() => <Tabs userType={userType} />}
      </Stack.Screen>
      <Stack.Screen name="MainApp">
        {() => <Tabs userType={userType} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}