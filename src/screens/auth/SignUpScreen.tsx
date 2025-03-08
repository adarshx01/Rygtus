// src/screens/auth/SignUpScreen.tsx

import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';

interface SignUpScreenProps {
  navigation: any;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // TODO: Implement sign-up logic
    console.log('Sign up with:', name, email, password, confirmPassword);
    navigation.navigate('Welcome');
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity onPress={handleSignUp}>
        <Text>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleLogin}>
        <Text>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
