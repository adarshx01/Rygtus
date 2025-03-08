// src/screens/main/ChatbotScreen.tsx

import React from 'react';
import {View, Text, TextInput} from 'react-native';

interface ChatbotScreenProps {
  navigation: any;
}

const ChatbotScreen: React.FC<ChatbotScreenProps> = ({navigation}) => {
  return (
    <View>
      <Text>Chatbot</Text>
      <TextInput placeholder="Type your query here" />
      <Text>Chatbot Responses</Text>
      <Text>Helpful Links/FAQs</Text>
    </View>
  );
};

export default ChatbotScreen;
