import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch, Picker } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MedBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [welcomeShown, setWelcomeShown] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");

  const sendMessage = () => {
    if (!input.trim()) return;
    if (welcomeShown) setWelcomeShown(false);

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([...newMessages, { text: "I'm here to help!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.header, darkMode && styles.darkText]}>MedBot</Text>
      <View style={styles.settingsContainer}>
        <Text style={[styles.settingsLabel, darkMode && styles.darkText]}>Language:</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={(itemValue) => setLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Spanish" value="es" />
          <Picker.Item label="French" value="fr" />
        </Picker>
        <View style={styles.switchContainer}>
          <Text style={[styles.settingsLabel, darkMode && styles.darkText]}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={setDarkMode} />
        </View>
      </View>
      {welcomeShown ? (
        <View style={styles.centerBox}>
          <Text style={[styles.welcomeText, darkMode && styles.darkText]}>Hello! I am MedBot. How can I assist you today?</Text>
          <View style={styles.inputContainer}>
            <TextInput 
              style={[styles.input, darkMode && styles.darkInput]} 
              placeholder="Type a message..." 
              placeholderTextColor={darkMode ? '#bbb' : '#000'}
              value={input} 
              onChangeText={setInput} 
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <ScrollView style={styles.chatContainer}>
          {messages.map((msg, index) => (
            <View key={index} style={[styles.message, msg.sender === "user" ? styles.userMessage : styles.botMessage]}>
              <Text style={msg.sender === "user" ? styles.userText : styles.botText}>{msg.text}</Text>
            </View>
          ))}
        </ScrollView>
      )}
      {!welcomeShown && (
        <View style={styles.inputContainer}>
          <TextInput 
            style={[styles.input, darkMode && styles.darkInput]} 
            placeholder="Type a message..." 
            placeholderTextColor={darkMode ? '#bbb' : '#000'}
            value={input} 
            onChangeText={setInput} 
            onSubmitEditing={sendMessage}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 10, justifyContent: 'center' },
  darkContainer: { backgroundColor: '#121212' },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#007bff' },
  darkText: { color: '#fff' },
  centerBox: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  welcomeText: { fontSize: 18, padding: 20, backgroundColor: 'white', borderRadius: 10, textAlign: 'center', color: '#333', shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 5, marginBottom: 20 },
  chatContainer: { flex: 1, marginBottom: 10 },
  message: { padding: 10, borderRadius: 10, marginBottom: 5, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#007bff' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#e0e0e0' },
  userText: { color: 'white' },
  botText: { color: 'black' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 5, backgroundColor: 'white', borderRadius: 25, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, width: '90%', alignSelf: 'center' },
  darkInput: { backgroundColor: '#333', color: 'white' },
  input: { flex: 1, padding: 10, fontSize: 16 },
  sendButton: { padding: 10, backgroundColor: '#007bff', borderRadius: 50, marginLeft: 5 },
  settingsContainer: { padding: 10, backgroundColor: 'white', borderRadius: 10, marginBottom: 10, alignItems: 'center' },
  picker: { width: 150, height: 50 },
  settingsLabel: { fontSize: 16, marginBottom: 5 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10 },
});