// src/screens/main/DashboardScreen.tsx

import React from 'react';
import {View, Text} from 'react-native';

interface DashboardScreenProps {
  navigation: any;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Dashboard for Doctors</Text>
      <Text>Upcoming Appointments</Text>
      <Text>Recent Patient Updates</Text>
      <Text>Quick Actions</Text>
    </View>
  );
};

export default DashboardScreen;
