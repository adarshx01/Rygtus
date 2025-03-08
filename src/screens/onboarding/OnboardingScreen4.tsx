// src/screens/onboarding/OnboardingScreen4.tsx

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface OnboardingScreen4Props {
  navigation: any;
}

const OnboardingScreen4: React.FC<OnboardingScreen4Props> = ({navigation}) => {
  const handleFinish = () => {
    navigation.navigate('Dashboard');
  };

  const handlePrevious = () => {
    navigation.navigate('Onboarding3');
  };

  return (
    <View>
      <Text>Onboarding Screen 4</Text>
      <Text>
        Manage your profile and settings to personalize your experience.
      </Text>
      <TouchableOpacity onPress={handlePrevious}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleFinish}>
        <Text>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen4;
