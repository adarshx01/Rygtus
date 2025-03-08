// src/screens/onboarding/OnboardingScreen1.tsx

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface OnboardingScreen1Props {
  navigation: any;
}

const OnboardingScreen1: React.FC<OnboardingScreen1Props> = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View>
      <Text>Onboarding Screen 1</Text>
      <Text>
        Welcome to our app! Here you can manage your patients and access their
        medical history.
      </Text>
      <TouchableOpacity onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen1;
