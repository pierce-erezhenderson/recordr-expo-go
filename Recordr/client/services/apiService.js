import { Platform } from 'react-native';
import Constants from 'expo-constants';

const localhost = Platform.OS === 'ios' ? 'localhost:3000' : '10.0.2.2:3000';

const DEV_API_URL = Constants.expoConfig?.hostUri
  ? `http://${Constants.expoConfig.hostUri.split(':').shift()}:3000`
  : `http://${localhost}`;

const PROD_API_URL = 'https://thermal-beach-428703-h2.ue.r.appspot.com';

const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

export { API_URL };

// const getApiUrl = () => {
//   if (__DEV__) {
//     return 'https://recordr.ngrok.dev';
//     // // For Expo Go
//     // if (Constants.expoConfig?.hostUri) {
//     //   const host = Constants.expoConfig.hostUri.split(':')[0];
//     //   return `http://${host}:3000`;
//     // }
    
//     // // Fallback for Android emulator
//     // if (Platform.OS === 'android') {
//     //   return 'http://10.0.2.2:3000';
//     // }
    
//     // // Fallback for iOS devices (including physical devices)
//     // return 'http://localhost:3000';
//   } else {
//     // For production - replace with your actual production API URL
//     return 'https://your-production-api.com';
//   }
// };

// export const API_URL = getApiUrl();

// console.log('API_URL:', API_URL); // Log the API_URL for debugging

export const speechApi = {
  transcribe: (audioChunk, isLastChunk) => {
    return fetch(`${API_URL}/api/generateRecordrNote`, {
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