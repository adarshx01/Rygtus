// src/screens/main/MedicalHistoryScreen.tsx

import React from 'react';
import {View, Text, TextInput} from 'react-native';

interface MedicalHistoryScreenProps {
  navigation: any;
}

const MedicalHistoryScreen: React.FC<MedicalHistoryScreenProps> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>Medical History</Text>
      <TextInput placeholder="Search Patient Records" />
      <Text>Patient Records</Text>
    </View>
  );
};

export default MedicalHistoryScreen;
