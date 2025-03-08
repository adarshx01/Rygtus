// src/services/chatbot.ts

import axios from 'axios';

const CHATBOT_API_URL = 'YOUR_CHATBOT_API_URL';

export const sendQuery = async (query: string) => {
  try {
    const response = await axios.post(`${CHATBOT_API_URL}/query`, {query});
    return response.data;
  } catch (error) {
    console.error('Chatbot query error:', error);
    throw error;
  }
};
