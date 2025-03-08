// src/screens/auth/ForgotPasswordScreen.tsx

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

interface ForgotPasswordScreenProps {
  navigation: any;
}

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  navigation,
}) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // TODO: Implement reset password logic
    console.log('Reset password for:', email);
    // TODO: Show a success message or navigate to a confirmation screen
  };

  const handleBackToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={handleResetPassword}>
        <Text>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBackToLogin}>
        <Text>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordScreen;
