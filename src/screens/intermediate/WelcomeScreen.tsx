// src/screens/intermediate/WelcomeScreen.tsx

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface WelcomeScreenProps {
  navigation: any;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({navigation}) => {
  const handleGetStarted = () => {
    navigation.navigate('Onboarding1');
  };

  return (
    <View>
      <Text>Welcome to My App</Text>
      <Text>
        This app is designed to help doctors manage their patients and provide
        quick access to medical history and chatbot support.
      </Text>
      <TouchableOpacity onPress={handleGetStarted}>
        <Text>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WelcomeScreen;
