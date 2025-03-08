import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, Switch } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { auth } from './firebaseConfig';

const db = getFirestore();

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('patient');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    address: '',
    age: '',
    specialization: '',
    experience: '',
  });

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        uid: user.uid,
        email,
        userType,
        name: formData.name,
        contact: formData.contact,
        address: formData.address,
      };
      
      if (userType === 'patient') {
        userData.age = formData.age;
      } else {
        userData.specialization = formData.specialization;
        userData.experience = formData.experience;
      }
      
      // Save user data to the 'users' collection
      await addDoc(collection(db, 'users'), userData);
      
      // Save user ID and type to the 'userTypes' collection
      await addDoc(collection(db, 'userTypes'), {
        uid: user.uid,
        userType: userType
      });
      
      if (userType === 'patient') {
        navigation.navigate('PatientForm');
      } else {
        navigation.navigate('MainApp');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sign Up</Text>
          <View style={styles.userTypeContainer}>
            <Text style={styles.userTypeLabel}>
              {userType === 'patient' ? 'Patient' : 'Doctor'}
            </Text>
            <Switch
              value={userType === 'doctor'}
              onValueChange={(value) => setUserType(value ? 'doctor' : 'patient')}
            />
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Contact"
          value={formData.contact}
          keyboardType="phone-pad"
          onChangeText={(text) => handleChange('contact', text)}
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Address"
          value={formData.address}
          onChangeText={(text) => handleChange('address', text)}
          placeholderTextColor="#aaa"
        />

        {userType === 'patient' && (
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={formData.age}
            keyboardType="numeric"
            onChangeText={(text) => handleChange('age', text)}
            placeholderTextColor="#aaa"
          />
        )}
        {userType === 'doctor' && (
          <>
            <TextInput
              style={styles.input}
              placeholder="Specialization"
              value={formData.specialization}
              onChangeText={(text) => handleChange('specialization', text)}
              placeholderTextColor="#aaa"
            />
            <TextInput
              style={styles.input}
              placeholder="Years of Experience"
              value={formData.experience}
              keyboardType="numeric"
              onChangeText={(text) => handleChange('experience', text)}
              placeholderTextColor="#aaa"
            />
          </>
        )}

        {error ? <Text style={styles.error}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  card: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  userTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userTypeLabel: {
    marginRight: 8,
    fontSize: 16,
    color: '#555',
  },
  input: {
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});