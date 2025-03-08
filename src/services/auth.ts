// src/services/auth.ts

import axios from 'axios';

const API_URL = 'YOUR_API_URL';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {email, password});
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const signUp = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    const response = await axios.post(`${API_URL}/reset-password`, {email});
    return response.data;
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};
