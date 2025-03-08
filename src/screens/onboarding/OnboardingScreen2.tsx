// src/screens/onboarding/OnboardingScreen2.tsx

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface OnboardingScreen2Props {
  navigation: any;
}

const OnboardingScreen2: React.FC<OnboardingScreen2Props> = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('Onboarding3');
  };

  const handlePrevious = () => {
    navigation.navigate('Onboarding1');
  };

  return (
    <View>
      <Text>Onboarding Screen 2</Text>
      <Text>Use our chatbot to get quick answers to your medical queries.</Text>
      <TouchableOpacity onPress={handlePrevious}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen2;
