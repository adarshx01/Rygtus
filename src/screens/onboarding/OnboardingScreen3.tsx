// src/screens/onboarding/OnboardingScreen3.tsx

import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

interface OnboardingScreen3Props {
  navigation: any;
}

const OnboardingScreen3: React.FC<OnboardingScreen3Props> = ({navigation}) => {
  const handleNext = () => {
    navigation.navigate('Onboarding4');
  };

  const handlePrevious = () => {
    navigation.navigate('Onboarding2');
  };

  return (
    <View>
      <Text>Onboarding Screen 3</Text>
      <Text>
        Access and update patient medical history easily with our intuitive
        interface.
      </Text>
      <TouchableOpacity onPress={handlePrevious}>
        <Text>Previous</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingScreen3;
