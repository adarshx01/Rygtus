import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet } from 'react-native';

export default function VirtualBot() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! I am your virtual bot. How can I assist you today?', sender: 'Bot' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return;
    const userMessage = { id: messages.length + 1, text: input, sender: 'User' };
    setMessages([...messages, userMessage]);
    setInput('');
    
    setTimeout(() => {
      let botReply = 'I am not sure how to respond to that.';
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        botReply = 'Hello! How can I help you?';
      } else if (input.toLowerCase().includes('help')) {
        botReply = 'Sure! Let me know what you need help with.';
      }
      const botMessage = { id: messages.length + 2, text: botReply, sender: 'Bot' };
      setMessages(prevMessages => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {messages.map(msg => (
          <View key={msg.id} style={msg.sender === 'Bot' ? styles.botMessage : styles.userMessage}>
            <Text>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#e0e0e0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#add8e6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
