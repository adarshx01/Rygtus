// src/services/api.ts

import axios from 'axios';

const API_URL = 'YOUR_API_URL';

export const fetchMedicalHistory = async (patientId: string) => {
  try {
    const response = await axios.get(`${API_URL}/medical-history/${patientId}`);
    return response.data;
  } catch (error) {
    console.error('Fetch medical history error:', error);
    throw error;
  }
};

export const updateMedicalHistory = async (patientId: string, data: any) => {
  try {
    const response = await axios.put(
      `${API_URL}/medical-history/${patientId}`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error('Update medical history error:', error);
    throw error;
  }
};
