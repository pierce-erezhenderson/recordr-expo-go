import { Platform } from 'react-native';
import Constants from 'expo-constants';

const getApiUrl = () => {
  if (__DEV__) {
    // For Expo Go
    if (Constants.expoConfig?.hostUri) {
      const host = Constants.expoConfig.hostUri.split(':')[0];
      return `http://${host}:3000`;
    }
    
    // Fallback for Android emulator
    if (Platform.OS === 'android') {
      return 'http://10.0.2.2:3000';
    }
    
    // Fallback for iOS devices (including physical devices)
    return 'http://localhost:3000';
  } else {
    // For production - replace with your actual production API URL
    return 'https://your-production-api.com';
  }
};

export const API_URL = getApiUrl();

console.log('API_URL:', API_URL); // Log the API_URL for debugging

export const speechApi = {
  transcribe: (audioChunk, isLastChunk) => {
    return fetch(`${API_URL}/api/createRecordrNote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        audio: audioChunk, 
        isLastChunk: isLastChunk 
      }),
    }).then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    });
  },
};