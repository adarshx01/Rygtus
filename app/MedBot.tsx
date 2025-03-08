import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function MedBot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I am MedBot. How can I assist you today?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages([...newMessages, { text: "I'm here to help!", sender: "bot" }]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MedBot</Text>
      <ScrollView style={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={[styles.message, msg.sender === "user" ? styles.userMessage : styles.botMessage]}>
            <Text style={msg.sender === "user" ? styles.userText : styles.botText}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input} 
          placeholder="Type a message..." 
          value={input} 
          onChangeText={setInput} 
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', padding: 10 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10, color: '#007bff' },
  chatContainer: { flex: 1, marginBottom: 10 },
  message: { padding: 10, borderRadius: 10, marginBottom: 5, maxWidth: '80%' },
  userMessage: { alignSelf: 'flex-end', backgroundColor: '#007bff' },
  botMessage: { alignSelf: 'flex-start', backgroundColor: '#e0e0e0' },
  userText: { color: 'white' },
  botText: { color: 'black' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 5, backgroundColor: 'white', borderTopWidth: 1, borderColor: '#ccc' },
  input: { flex: 1, padding: 10, fontSize: 16 },
  sendButton: { padding: 10, backgroundColor: '#007bff', borderRadius: 50, marginLeft: 5 }
});
