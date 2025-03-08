// src/screens/main/ProfileScreen.tsx

import React from 'react';
import {View, Text} from 'react-native';

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Profile</Text>
      <Text>User Information</Text>
      <Text>Settings</Text>
      <Text>Notifications</Text>
    </View>
  );
};

export default ProfileScreen;
