import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Speech from 'expo-speech';
import * as SpeechRecognition from 'expo-speech-recognition';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [consentGiven, setConsentGiven] = useState(false);
  const [declineMessage, setDeclineMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isVoiceMode, setIsVoiceMode] = useState(true);
  const [inputMessage, setInputMessage] = useState('');
  const scrollViewRef = useRef();
  const [hasPermission, setHasPermission] = useState(false);
  const [paramToken, setParamToken] = useState('1');

  // Load messages from AsyncStorage on initial render
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const savedMessages = await AsyncStorage.getItem('chatMessages');
        if (savedMessages) {
          setMessages(JSON.parse(savedMessages));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    
    loadMessages();
  }, []);

  // Save messages to AsyncStorage whenever they change
  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('chatMessages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages:', error);
      }
    };
    
    saveMessages();
  }, [messages]);

  // Request audio permissions when consent is given
  useEffect(() => {
    if (consentGiven) {
      requestPermissions();
      setTimeout(() => {
        const initialGreeting = "Hey, this is AIBot, how can I assist you?";
        speakMessage(initialGreeting);
      }, 1000);
    }
  }, [consentGiven]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  useEffect(() => {
    const loadTokenFromStorage = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Stored token:', storedToken);
        if (storedToken) {
          setParamToken(storedToken);
        }
      } catch (error) {
        console.error('Error reading token:', error);
      }
    };
    loadTokenFromStorage();
  }, []);

  const requestPermissions = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission required', 
          'Microphone permission is needed for voice functionality'
        );
      }
    } catch (error) {
      console.error('Error requesting permissions:', error);
    }
  };

  const speakMessage = async (message) => {
    return new Promise((resolve) => {
      // Stop any ongoing speech
      Speech.stop();
      
      // Stop listening while speaking
      stopListening();
  
      const options = {
        language: 'en-US',
        pitch: 1.0,
        rate: 0.9,
        onStart: () => console.log('Started speaking'),
        onDone: () => {
          console.log('Finished speaking');
          // Always start listening after speaking in voice mode
          if (isVoiceMode) {
            setTimeout(() => {
              startListening();
            }, 200); // Small delay to allow user to prepare
          }
          resolve();
        },
        onError: (error) => {
          console.error('Speech error:', error);
          resolve();
        }
      };
  
      // Only speak if message is not too long
      if (message.length <= 500) {
        Speech.speak(message, options);
      } else {
        console.log('Message too long for speech synthesis');
        resolve();
      }
    });
  };

  const startListening = async () => {
    if (!hasPermission) {
      await requestPermissions();
      if (!hasPermission) return;
    }
    
    try {
      setIsListening(true);
      
      // Simulated listening (replace with real speech recognition in production)
      setTimeout(() => {
        setIsListening(false);
        // Simulate user input (e.g., handleSendMessage("User's message"));
      }, 5000);
      
      Alert.alert('Speak now', 'The app is listening...');
      
    } catch (error) {
      console.error('Error starting recognition:', error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (isListening) {
      // In a real app: SpeechRecognition.stopListeningAsync()
      setIsListening(false);
    }
  };

  const handleSendMessage = async (message, type = 'chat') => {
    if (!message.trim()) return;
  
    stopListening();
    
    const newUserMessage = { role: 'user', content: message, type };
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setLoading(true);
  
    try {
      // Replace with your Google Gemini API endpoint
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, token: paramToken }),
      });
      console.log('paramToken:', paramToken);
      const data = await response.json();
      
      if (data.message) {
        const botMessage = { role: 'assistant', content: data.message, type };
        setMessages(prevMessages => [...prevMessages, botMessage]);
        
        if (isVoiceMode) {
          await speakMessage(data.message);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Simulate a response for testing purposes
      const simulatedResponse = { 
        role: 'assistant', 
        content: "I'm sorry, I couldn't connect to the server. Please try again later.", 
        type 
      };
      setMessages(prevMessages => [...prevMessages, simulatedResponse]);
      
      if (isVoiceMode) {
        await speakMessage(simulatedResponse.content);
      }
    } finally {
      setLoading(false);
      setInputMessage('');
      // Removed redundant startListening call here
    }
  };

  const handleConsent = () => {
    setConsentGiven(true);
    setDeclineMessage('');
  };

  const handleDecline = () => {
    setDeclineMessage('Please accept the consent to proceed and talk to the AI.');
  };

  const toggleMode = () => {
    setIsVoiceMode(!isVoiceMode);
    if (isListening) {
      stopListening();
    }
  };

  const handleInputChange = (text) => {
    setInputMessage(text);
  };

  const handleSubmit = () => {
    if (inputMessage.trim()) {
      handleSendMessage(inputMessage);
    }
  };

  const clearChat = async () => {
    setMessages([]);
    try {
      await AsyncStorage.removeItem('chatMessages');
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  if (!consentGiven) {
    return (
      <SafeAreaView style={styles.consentContainer}>
        <View style={styles.consentPopup}>
          <Text style={styles.consentTitle}>Consent Required</Text>
          <Text style={styles.consentText}>
            To continue, we need your consent. Your conversation will be saved and analyzed by the AI to improve the experience and provide you with better support. Do you agree to proceed?
          </Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.button, styles.agreeButton]} 
              onPress={handleConsent}
            >
              <Text style={styles.buttonText}>I Agree</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.declineButton]} 
              onPress={handleDecline}
            >
              <Text style={styles.buttonText}>I Decline</Text>
            </TouchableOpacity>
          </View>
          {declineMessage ? (
            <Text style={styles.declineMessageText}>{declineMessage}</Text>
          ) : null}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <Text style={styles.titleText}>AI Assistant Chatbot</Text>
      
      <View style={styles.chatBox}>
        <ScrollView 
          ref={scrollViewRef}
          contentContainerStyle={styles.chatContent}
        >
          <View style={styles.messageContainer}>
            <View style={styles.botMessageBubble}>
              <Text style={styles.messageLabel}>Bot:</Text>
              <Text style={styles.messageText}>Hey, this is Aegis. How can I assist you!</Text>
            </View>
          </View>
          
          {messages.map((msg, idx) => (
            <View 
              key={idx} 
              style={[
                styles.messageContainer,
                msg.role === 'user' ? styles.userMessageContainer : styles.botMessageContainer
              ]}
            >
              <View 
                style={[
                  msg.role === 'user' ? styles.userMessageBubble : styles.botMessageBubble
                ]}
              >
                <Text style={styles.messageLabel}>
                  {msg.role === 'user' ? 'You:' : 'Bot:'}
                </Text>
                <Text style={styles.messageText}>{msg.content}</Text>
              </View>
            </View>
          ))}
          
          {loading && (
            <View style={styles.messageContainer}>
              <View style={styles.botMessageBubble}>
                <Text style={styles.messageText}>Thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      
      <View style={styles.inputContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.modeButton]} 
          onPress={toggleMode}
        >
          <Text style={styles.buttonText}>
            {isVoiceMode ? 'Text Mode' : 'Voice Mode'}
          </Text>
        </TouchableOpacity>
        
        {isVoiceMode ? (
          <TouchableOpacity 
            style={[
              styles.button, 
              styles.listenButton,
              isListening ? styles.listeningButton : null
            ]} 
            onPress={startListening}
            disabled={isListening || loading}
          >
            <Text style={styles.buttonText}>
              {isListening ? 'Listening...' : loading ? 'Processing...' : 'Speak'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputMessage}
              onChangeText={handleInputChange}
              placeholder="Type your message..."
              placeholderTextColor="#888"
            />
            <TouchableOpacity 
              style={[styles.button, styles.sendButton]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.clearButton]} 
          onPress={clearChat}
        >
          <Text style={styles.buttonText}>Clear</Text>
        </TouchableOpacity>
      </View>
      
      {isListening && (
        <Text style={styles.listeningText}>
          Microphone is active - Please speak now
        </Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  chatBox: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#90EE90', // Light green
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#90EE90',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  chatContent: {
    padding: 16,
  },
  messageContainer: {
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  userMessageContainer: {
    alignItems: 'flex-end',
  },
  botMessageContainer: {
    alignItems: 'flex-start',
  },
  botMessageBubble: {
    backgroundColor: '#E8F5E9', // Light green
    borderWidth: 1,
    borderColor: '#90EE90',
    borderRadius: 12,
    padding: 8,
    maxWidth: '76%',
  },
  userMessageBubble: {
    backgroundColor: '#E3F2FD', // Light blue
    borderWidth: 1,
    borderColor: '#90CAF9',
    borderRadius: 12,
    padding: 8,
    maxWidth: '76%',
  },
  messageLabel: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  textInputContainer: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeButton: {
    backgroundColor: '#673AB7', // Purple
  },
  listenButton: {
    backgroundColor: '#2196F3', // Blue
    flex: 1,
    marginHorizontal: 8,
  },
  listeningButton: {
    backgroundColor: '#4CAF50', // Green
  },
  sendButton: {
    backgroundColor: '#2196F3', // Blue
  },
  clearButton: {
    backgroundColor: '#F44336', // Red
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listeningText: {
    color: '#4CAF50',
    marginTop: 8,
    textAlign: 'center',
  },
  consentContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  consentPopup: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  consentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  consentText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  agreeButton: {
    backgroundColor: '#4CAF50', // Green
  },
  declineButton: {
    backgroundColor: '#F44336', // Red
  },
  declineMessageText: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});